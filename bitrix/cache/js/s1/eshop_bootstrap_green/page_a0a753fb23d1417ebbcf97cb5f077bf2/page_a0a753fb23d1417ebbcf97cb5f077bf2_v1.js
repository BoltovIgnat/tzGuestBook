
; /* Start:"a:4:{s:4:"full";s:79:"/local/components/ibc/guestbook.add/templates/.default/script.js?15733077471002";s:6:"source";s:64:"/local/components/ibc/guestbook.add/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(document).ready(function(){
    $( ".ibcadd" ).click(function(e) {
        console.log('click');

        var fd = new FormData;

        fd.append('img', $(".ibcaddfile").prop('files')[0]);
        fd.append('title', $(".ibcaddtitle").val());
        fd.append('body', $(".ibcaddtitle").val());

        $.ajax({
            url: '/ibcGuestBook/ajax/ajaxAdd.php',
            type: 'POST',
            data: fd,
            processData: false,
            contentType: false,
            success: function(res){
                console.log(res);
                if(res === '1'){
                    let options = {
                        "backdrop" : "static",
                        "show":true
                    }
                    $('#modalPopup').modal(options);
                }
            },
            error: function(){
                console.log('Произошла ошибка!');
            }
        });
        e.preventDefault();
    });
});
/* End */
;; /* /local/components/ibc/guestbook.add/templates/.default/script.js?15733077471002*/
