<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
//$APPLICATION->SetTitle("Гостевая книга");
?>
<div class="jumbotron">
    <div class="container">
        <h3 class="display-3">Просмотр записи</h3>
        <p><a class="btn btn-primary btn-lg" href="/ibcGuestBook/" role="button">К списку</a></p>
    </div>
</div>


<?$APPLICATION->IncludeComponent(
    'ibc:guestbook.view',         // имя компонента
    '',     // шаблон компонента, пустая строка если шаблон по умолчанию
    array(),      // параметры
    null,  // null или объект родительского компонента
    array()
);?>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
