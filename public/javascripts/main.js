'use strict';

$(function() {
    var usr, p;  
    usr = sessionStorage.getItem("user");
    p = sessionStorage.getItem("permission");
   $('#signout').on('click', () => {
        sessionStorage.clear();
        window.open('/login', '_self');
    })

    $('#profile').on('click', function(){
        window.open('/profile','_self');
    })
})
