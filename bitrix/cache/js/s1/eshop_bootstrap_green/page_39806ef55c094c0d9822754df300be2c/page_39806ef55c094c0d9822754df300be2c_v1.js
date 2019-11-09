
; /* Start:"a:4:{s:4:"full";s:80:"/local/components/ibc/guestbook.view/templates/.default/script.js?15733132411230";s:6:"source";s:65:"/local/components/ibc/guestbook.view/templates/.default/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
$(document).ready(function(){
    $( ".ibcaddcomment" ).click(function(e) {

        var params = window
            .location
            .search
            .replace('?','')
            .split('&')
            .reduce(
                function(p,e){
                    var a = e.split('=');
                    p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                    return p;
                },
                {}
            );

        var fd = new FormData;
        var commentbody = $(".ibccommentbody").val()
        fd.append('parentid', params['id']);
        fd.append('commentbody', commentbody);

        $.ajax({
            url: '/ibcGuestBook/ajax/ajaxAddComment.php',
            type: 'POST',
            data: fd,
            processData: false,
            contentType: false,
            success: function(res){
                console.log(res);
                if(res === '1'){
                    $(".ibccomments").append('<li>'+commentbody+'</li>');
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
;; /* /local/components/ibc/guestbook.view/templates/.default/script.js?15733132411230*/
