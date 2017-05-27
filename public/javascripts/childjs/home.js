'use strict';
$(function(){
  var userInfo_str = sessionStorage.getItem("userInfo");
  var userInfo_obj = JSON.parse(userInfo_str);
  var acc = userInfo_obj.account;
  $('#accName').text(acc);


  $('#profile').on('click', function(){
    window.open('/profile','_self')
  })


})
