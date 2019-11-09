<?
require_once($_SERVER['DOCUMENT_ROOT'] . "/bitrix/modules/main/include/prolog_before.php");
use Bitrix\Main\Loader;
use Bitrix\Highloadblock as HL;
global $USER;
Loader::includeModule("highloadblock");

if(!$_POST){
    die('No Post Variables');
}
$iduser = $USER->GetID();

$fid = CFile::SaveFile($_FILES["img"], "ibc");

$hlbl = 3; // Указываем ID нашего highloadblock блока к которому будет делать запросы.
$hlblock = HL\HighloadBlockTable::getById($hlbl)->fetch();

$entity = HL\HighloadBlockTable::compileEntity($hlblock);
$entity_data_class = $entity->getDataClass();

// Массив полей для добавления
$data = array(
    "UF_TITLE"=> $_POST['title'],
    "UF_BODY"=> $_POST['body'],
    "UF_IDUSER"=> $iduser
);

if (!empty($_FILES)) {
    $data["UF_FILES"] = array(\CFile::MakeFileArray($fid));
}

$result = $entity_data_class::add($data);

print_r($result->isSuccess());
