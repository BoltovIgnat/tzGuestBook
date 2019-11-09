
; /* Start:"a:4:{s:4:"full";s:78:"/local/components/ibc/guestbook.add/templates/.default/script.js?1573299904554";s:6:"source";s:64:"/local/components/ibc/guestbook.add/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(document).ready(function(){
    $( ".ibcadd" ).click(function(e) {
        console.log('click');
        var data = $('.ibcform').serialize();
        console.log(data);
        $.ajax({
            url: '/ibcGuestBook/ajax/ajaxAdd.php',
            type: 'POST',
            data: data,
            success: function(res){
                console.log(res);
            },
            error: function(){
                console.log('Произошла ошибка!');
            }
        });
        e.preventDefault();
    });
});
/* End */
;; /* /local/components/ibc/guestbook.add/templates/.default/script.js?1573299904554*/
