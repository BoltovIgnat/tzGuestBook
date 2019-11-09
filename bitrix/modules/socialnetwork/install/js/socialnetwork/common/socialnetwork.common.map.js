{"version":3,"sources":["socialnetwork.common.js"],"names":["BX","window","SocialnetworkUICommon","showRecallJoinRequestPopup","params","parseInt","RELATION_ID","type","isNotEmptyString","URL_REJECT_OUTGOING_REQUEST","isProject","PROJECT","successPopup","PopupWindow","width","autoHide","lightShadow","zIndex","overlay","content","create","children","text","message","props","className","events","click","delegate","event","_currentTarget","currentTarget","this","hideError","showButtonWait","ajax","url","method","dataType","data","action","max_count","checked_0","type_0","id_0","ajax_request","sessid","bitrix_sessid","onsuccess","deleteResponseData","hideButtonWait","MESSAGE","destroy","URL_GROUPS_LIST","top","location","href","ERROR_MESSAGE","length","showError","onfailure","closeByEsc","closeIcon","show","showGroupMenuPopup","bindElement","currentUserId","sonetGroupMenu","SonetGroupMenu","getInstance","tagName","addClass","menu","push","favoritesValue","title","id","onclick","setItemTitle","onCustomEvent","groupId","value","setFavoritesAjax","callback","success","name","NAME","URL","extranet","EXTRANET","SidePanel","Instance","postMessageAll","code","ID","RESULT","failure","perms","canInitiate","urls","requestUser","canModify","edit","hideArchiveLinks","featuresItem","editFeaturesAllowed","features","B24","licenseInfoPopup","delete","canModerate","members","canProcessRequestsIn","requests","requestsOut","userRole","initiatedByType","userRequestItem","isOpened","proxy","sendJoinRequest","userRequestGroup","userIsMember","userIsAutoMember","userLeaveGroup","popup","PopupMenu","offsetTop","offsetLeft","offsetWidth","angle","onPopupClose","removeClass","item","getMenuItem","menuItem","layout","popupWindow","menuPopup","Waiter","close","groupID","save","responseData","hide","actionUrl","util","add_url_param","b24statAction","lang","SUCCESS","buttonNode","disabled","style","cursor","errorText","errorNode","innerHTML","reload","getSliderByWindow","showLoader","isOpen","getPageUrl","reloadBlock","blockId","promise","BLOCK_RELOAD","BLOCK_ID","then","CONTENT","setTimeout","processRequestData","closeGroupCardMenu","node","doc","ownerDocument","win","defaultView","parentWindow","instance","waitTimeout","waitPopup","prototype","timeout","html","setBindElement","clearTimeout","addCustomEvent"],"mappings":"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","file":""}