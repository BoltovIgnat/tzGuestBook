<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
//$APPLICATION->SetTitle("Гостевая книга");
?>
<div class="jumbotron">
    <div class="container">
        <h1 class="display-3">Гостевая книга</h1>
        <p><a class="btn btn-primary btn-lg" href="/ibcGuestBook/add.php" role="button">Добавить запись</a></p>
    </div>
</div>

<?$APPLICATION->IncludeComponent(
    'ibc:guestbook.list',         // имя компонента
    '',     // шаблон компонента, пустая строка если шаблон по умолчанию
    array(),      // параметры
    null,  // null или объект родительского компонента
    array()
);?>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>