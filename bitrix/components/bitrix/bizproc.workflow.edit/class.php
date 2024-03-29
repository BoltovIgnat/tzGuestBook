<?php

use Bitrix\Main;
use Bitrix\Main\Localization\Loc;

if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

if(!Main\Loader::includeModule('bizproc') || !Main\Loader::includeModule('bizprocdesigner'))
{
	return;
}

Loc::loadMessages(__FILE__);

class BizprocWorkflowEditComponent extends \CBitrixComponent
{
	protected function listKeysSignedParameters()
	{
		return ['MODULE_ID', 'ENTITY', 'DOCUMENT_TYPE'];
	}

	/**
	 * @param array $params
	 * @return array
	 */
	public function onPrepareComponentParams($params)
	{
		$params['SET_TITLE'] = !(isset($params['SET_TITLE']) && $params['SET_TITLE'] == 'N');
		$params['BACK_URL'] = (isset($_REQUEST['back_url']) && $_REQUEST['back_url'][0] === '/' && $_REQUEST['back_url'][1] !== '/') ? (string)$_REQUEST['back_url'] : null;

		if (!isset($params['MODULE_ID']) && defined('MODULE_ID'))
		{
			$params['MODULE_ID'] = MODULE_ID;
		}

		if (!isset($params['ENTITY']) && defined('ENTITY'))
		{
			$params['ENTITY'] = ENTITY;
		}

		if (!defined('MODULE_ID'))
		{
			define("MODULE_ID", $params["MODULE_ID"]);
		}
		if (!defined('ENTITY'))
		{
			define("ENTITY", $params["ENTITY"]);
		}

		$params['DOCUMENT_TYPE'] = preg_replace("/[^0-9A-Za-z_-]/", "", $params['DOCUMENT_TYPE']);

		return $params;
	}

	protected function isAuthorizationNeeded()
	{
		global $USER;
		return !(isset($USER) && is_object($USER) && $USER->IsAuthorized());
	}

	protected function setPageTitle($title)
	{
		global $APPLICATION;
		$APPLICATION->SetTitle($title);
	}

	public function executeComponent()
	{
		global $APPLICATION, $USER;

		$this->arResult = [
			'NeedAuth' => $this->isAuthorizationNeeded()? 'Y' : 'N',
			'FatalErrorMessage' => '',
			'ErrorMessage' => ''
		];

		$this->arResult['DOCUMENT_TYPE'] = $this->arParams["DOCUMENT_TYPE"];
		$this->arResult['ID'] = $this->arParams["ID"];

		$this->arResult['LIST_PAGE_URL'] = $this->arParams['LIST_PAGE_URL'];
		$this->arResult["EDIT_PAGE_TEMPLATE"] = $this->arParams["EDIT_PAGE_TEMPLATE"];
		$backUrl = $this->arParams['BACK_URL'];

		$this->arResult['DOCUMENT_TYPE'] = $this->arParams['DOCUMENT_TYPE'];

		$document_type = $this->arResult['DOCUMENT_TYPE'];

		$canWrite = false;

		$ID = IntVal($this->arResult['ID']);
		if($ID > 0)
		{
			$dbTemplatesList = CBPWorkflowTemplateLoader::GetList([], ["ID" =>$ID]);
			if ($arTemplate = $dbTemplatesList->Fetch())
			{
				$canWrite = CBPDocument::CanUserOperateDocumentType(
					CBPCanUserOperateOperation::CreateWorkflow,
					$GLOBALS["USER"]->GetID(),
					$arTemplate["DOCUMENT_TYPE"]
				);

				$document_type = $arTemplate["DOCUMENT_TYPE"][2];

				$workflowTemplateName = $arTemplate["NAME"];
				$workflowTemplateDescription = $arTemplate["DESCRIPTION"];
				$workflowTemplateAutostart = $arTemplate["AUTO_EXECUTE"];
				$arWorkflowTemplate = $arTemplate["TEMPLATE"];
				$arWorkflowParameters = $arTemplate["PARAMETERS"];
				$arWorkflowVariables = $arTemplate["VARIABLES"];
				$arWorkflowConstants = $arTemplate["CONSTANTS"];
			}
			else
			{
				$ID = 0;
			}
		}

		if($ID <= 0)
		{
			if(!$document_type)
			{
				$APPLICATION->AuthForm(Loc::getMessage("ACCESS_DENIED")." ".Loc::getMessage("BIZPROC_WFEDIT_ERROR_TYPE"));
			}

			$canWrite = CBPDocument::CanUserOperateDocumentType(
				CBPCanUserOperateOperation::CreateWorkflow,
				$GLOBALS["USER"]->GetID(),
				[MODULE_ID, ENTITY, $document_type]
			);

			$workflowTemplateName = Loc::getMessage("BIZPROC_WFEDIT_DEFAULT_TITLE");
			$workflowTemplateDescription = '';
			$workflowTemplateAutostart = 1;

			if ($_GET['init'] == 'statemachine')
			{
				$arWorkflowTemplate = [
					[
						"Type" => "StateMachineWorkflowActivity",
						"Name" => "Template",
						"Properties" => [],
						"Children" => []
					]
				];
			}
			else
			{
				$arWorkflowTemplate = [
					[
						"Type" => "SequentialWorkflowActivity",
						"Name" => "Template",
						"Properties" => [],
						"Children" => []
					]
				];
			}

			$arWorkflowParameters = [];
			$arWorkflowVariables = [];
			$arWorkflowConstants = [];
		}

		if(!$canWrite)
		{
			$APPLICATION->AuthForm(Loc::getMessage("ACCESS_DENIED"));
		}

		$saveUrl = $this->arResult["LIST_PAGE_URL"];
		$applyUrl = str_replace("#ID#", $ID, $this->arResult["EDIT_PAGE_TEMPLATE"]);
		if ($backUrl)
		{
			$saveUrl = $backUrl;
			$applyUrl = CHTTP::urlAddParams($applyUrl, ['back_url' => $backUrl], ['encode' => true]);
			$this->arResult['BACK_URL'] = $backUrl;
		}

		if($_SERVER['REQUEST_METHOD']=='POST' && $_REQUEST['saveajax']=='Y' && check_bitrix_sessid())
		{
			$APPLICATION->RestartBuffer();
			CBPHelper::decodeTemplatePostData($_POST);

			if($_REQUEST['saveuserparams']=='Y')
			{
				$d = serialize($_POST['USER_PARAMS']);
				$maxLength = 16777215;//pow(2, 24) - 1; //mysql mediumtext column length
				if (\Bitrix\Main\Text\BinaryString::getLength($d) > $maxLength)
				{
				?><!--SUCCESS--><script>
					alert('<?=GetMessageJS("BIZPROC_USER_PARAMS_SAVE_ERROR")?>');
				</script><?
				die();
				}
				CUserOptions::SetOption("~bizprocdesigner", "activity_settings", $d);
				die('<!--SUCCESS-->');
			}

			$arFields = [
				"DOCUMENT_TYPE" => [MODULE_ID, ENTITY, $document_type],
				//		"ACTIVE" 		=> $_POST["ACTIVE"],
				"AUTO_EXECUTE" 	=> $_POST["workflowTemplateAutostart"],
				"NAME" 			=> $_POST["workflowTemplateName"],
				"DESCRIPTION" 	=> $_POST["workflowTemplateDescription"],
				"TEMPLATE" 		=> $_POST["arWorkflowTemplate"],
				"PARAMETERS"	=> $_POST["arWorkflowParameters"],
				"VARIABLES" 	=> $_POST["arWorkflowVariables"],
				"CONSTANTS" 	=> $_POST["arWorkflowConstants"],
				"USER_ID"		=> intval($USER->GetID()),
				"MODIFIER_USER" => new CBPWorkflowTemplateUser(CBPWorkflowTemplateUser::CurrentUser),
			];

			if(!is_array($arFields["VARIABLES"]))
				$arFields["VARIABLES"] = [];
			if(!is_array($arFields["CONSTANTS"]))
				$arFields["CONSTANTS"] = [];

			try
			{
				if($ID>0)
				{
					CBPWorkflowTemplateLoader::Update($ID, $arFields);
				}
				else
				{
					$ID = CBPWorkflowTemplateLoader::Add($arFields);
					$applyUrl = str_replace("#ID#", $ID, $this->arResult["EDIT_PAGE_TEMPLATE"]);
					if ($backUrl)
					{
						$applyUrl = CHTTP::urlAddParams($applyUrl, ['back_url' => $backUrl], ['encode' => true]);
					}
				}
			}
			catch (Exception $e)
			{
				$errorMessages = [];
				$errors = [];
				if (method_exists($e, 'getErrors'))
				{
					$errors = $e->getErrors();
					foreach($errors as $error)
					{
						$errorMessages[] = CUtil::JSEscape($error['message']);
					}
				}
				else
				{
					$errorMessages[] = CUtil::JSEscape($e->getMessage());
				}
				?><!--SUCCESS--><script>
					alert('<?=GetMessageJS("BIZPROC_WFEDIT_SAVE_ERROR")?>\n<?=implode('\n', $errorMessages)?>');
					(function(){
						var i, setFocus = true, activity, error, errors = [];
						errors = <?=\Bitrix\Main\Web\Json::encode($errors);?>;

						for (i = 0; i < errors.length; ++i)
						{
							error = errors[i];
							if (error.activityName)
							{
								activity = window.rootActivity.findChildById(error.activityName);
								/** @var BizProcActivity activity */
								if (activity)
								{
									activity.SetError(true, setFocus);
									setFocus = false;
								}
							}
						}
					})();
				</script><?
				die();
			}
			?><!--SUCCESS--><script>
				BPTemplateIsModified = false;
				window.location = '<?=($_REQUEST["apply"]=="Y"? CUtil::JSEscape($applyUrl) : CUtil::JSEscape($saveUrl))?>';
			</script><?
			die();
		}

		if($_SERVER['REQUEST_METHOD']=='GET' && $_REQUEST['export_template']=='Y' && check_bitrix_sessid())
		{
			$APPLICATION->RestartBuffer();
			if ($ID > 0)
			{
				$datum = CBPWorkflowTemplateLoader::ExportTemplate($ID);

				header("HTTP/1.1 200 OK");
				header("Content-Type: application/force-download; name=\"bp-".$ID.".bpt\"");
				header("Content-Transfer-Encoding: binary");
				header("Content-Length: ". \Bitrix\Main\Text\BinaryString::getLength($datum));
				header("Content-Disposition: attachment; filename=\"bp-".$ID.".bpt\"");
				header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
				header("Expires: 0");
				header("Pragma: public");

				echo $datum;
			}
			die();
		}

		if($_SERVER['REQUEST_METHOD']=='POST' && $_REQUEST['import_template']=='Y' && check_bitrix_sessid())
		{
			$APPLICATION->RestartBuffer();
			//CUtil::DecodeUriComponent($_POST);

			$r = 0;
			$errTmp = "";
			if (is_uploaded_file($_FILES['import_template_file']['tmp_name']))
			{
				$f = fopen($_FILES['import_template_file']['tmp_name'], "rb");
				$datum = fread($f, filesize($_FILES['import_template_file']['tmp_name']));
				fclose($f);

				try
				{
					$r = CBPWorkflowTemplateLoader::ImportTemplate(
						$ID,
						[MODULE_ID, ENTITY, $document_type],
						$_POST["import_template_autostart"],
						$_POST["import_template_name"],
						$_POST["import_template_description"],
						$datum
					);
				}
				catch (Exception $e)
				{
					$errTmp = preg_replace("#[\r\n]+#", " ", $e->getMessage());
				}
			}
			?>
			<script>
				<?if (intval($r) <= 0):?>
				alert('<?= GetMessageJS("BIZPROC_WFEDIT_IMPORT_ERROR").(strlen($errTmp) > 0 ? ": ".CUtil::JSEscape($errTmp) : "" ) ?>');
				<?else:?>
				<?$ID = $r;?>
				<?endif;
				$applyUrl = str_replace("#ID#", $ID, $this->arResult["EDIT_PAGE_TEMPLATE"]);
				if ($backUrl)
				{
					$applyUrl = CHTTP::urlAddParams($applyUrl, ['back_url' => $backUrl], ['encode' => true]);
				}
				?>
				window.location = '<?=CUtil::JSEscape($applyUrl)?>';
			</script>
			<?
			die();
		}

		$arAllActGroups = [
			"document" => Loc::getMessage("BIZPROC_WFEDIT_CATEGORY_DOC"),
			'task' => Loc::getMessage('BIZPROC_WFEDIT_CATEGORY_TASKS'),
			"logic" => Loc::getMessage("BIZPROC_WFEDIT_CATEGORY_CONSTR"),
			"interaction" => Loc::getMessage("BIZPROC_WFEDIT_CATEGORY_INTER"),
			"rest" => Loc::getMessage("BIZPROC_WFEDIT_CATEGORY_REST"),
		];

		$runtime = CBPRuntime::GetRuntime();
		$runtime->StartRuntime();
		$arAllActivities = $runtime->SearchActivitiesByType("activity", [MODULE_ID, ENTITY, $document_type]);

		foreach ($arAllActivities as $activity)
		{
			if (!empty($activity['CATEGORY']['OWN_ID']) && !empty($activity['CATEGORY']['OWN_NAME']))
			{
				$arAllActGroups[$activity['CATEGORY']['OWN_ID']] = $activity['CATEGORY']['OWN_NAME'];
			}
		}
		$arAllActGroups['other'] = Loc::getMessage("BIZPROC_WFEDIT_CATEGORY_OTHER");

		$this->arResult['DOCUMENT_TYPE'] = $document_type;

		$this->arResult['ACTIVITY_GROUPS'] = $arAllActGroups;
		$this->arResult['ACTIVITIES'] = $arAllActivities;

		$this->arResult['TEMPLATE_NAME'] = $workflowTemplateName;
		$this->arResult['TEMPLATE_DESC'] = $workflowTemplateDescription;
		$this->arResult['TEMPLATE_AUTOSTART'] = $workflowTemplateAutostart;
		$this->arResult['TEMPLATE'] = $arWorkflowTemplate;
		$this->arResult['TEMPLATE_CHECK_STATUS'] = CBPWorkflowTemplateLoader::checkTemplateActivities($arWorkflowTemplate);
		$this->arResult['PARAMETERS'] = $arWorkflowParameters;
		$this->arResult['VARIABLES'] = $arWorkflowVariables;
		$this->arResult['CONSTANTS'] = $arWorkflowConstants;
		$this->arResult['GLOBAL_CONSTANTS'] = \Bitrix\Bizproc\Workflow\Type\GlobalConst::getAll();

		/** @var CBPDocumentService $documentService */
		$documentService = $runtime->getDocumentService();
		$this->arResult['DOCUMENT_FIELDS'] = $documentService->GetDocumentFields([MODULE_ID, ENTITY, $document_type]);

		$this->arResult["ID"] = $ID;

		$defUserParamsStr = serialize(['groups' => []]);
		$userParamsStr = CUserOptions::GetOption('~bizprocdesigner', 'activity_settings', $defUserParamsStr);
		if (empty($userParamsStr) || !CheckSerializedData($userParamsStr))
		{
			$userParamsStr = $defUserParamsStr;
		}

		$this->arResult["USER_PARAMS"] = unserialize($userParamsStr);

		if ($this->arParams['SET_TITLE'])
		{
			$this->setPageTitle(Loc::getMessage(
					$ID > 0 ? 'BIZPROC_WFEDIT_TITLE_EDIT' : 'BIZPROC_WFEDIT_TITLE_ADD'
			));
		}

		$this->includeComponentTemplate();
	}
}