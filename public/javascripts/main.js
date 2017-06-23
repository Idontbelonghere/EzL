'use strict';

$(function() {
  var usr, p;
  var userInfo_str = sessionStorage.getItem("userInfo");
  if(userInfo_str){
    var userInfo_obj = JSON.parse(userInfo_str);
    var acc = userInfo_obj.account;
    console.log('welcome back '+acc);
  }else{
    window.open('/','_self')
  }
  $('#usrName').text(acc);

  $('#signout').on('click', () => {
    sessionStorage.clear();
    window.open('/login', '_self');
  })
  $('#profile').on('click', function() {
    window.open('/user', '_self')
  })

  $('#settings').on('click', function() {
    window.open('/settings', '_self')
  })

})
