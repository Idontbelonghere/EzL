'use strict';

$(function() {
  var usr, p;
  var userInfo_str = sessionStorage.getItem("userInfo");
  var userInfo_obj = JSON.parse(userInfo_str);
  var acc = userInfo_obj.account;
  $('#usrName').text(acc);

  $('#signout').on('click', () => {
    sessionStorage.clear();
    window.open('/login', '_self');
  })
  $('#profile').on('click', function() {
    window.open('/user', '_self')
  })
})
