'use strict';

$(function() {

  var userInfo_str = sessionStorage.getItem("userInfo");
  var userInfo_obj = JSON.parse(userInfo_str);
  var role = userInfo_obj.role;
  $('#userName').val(userInfo_obj.profile.name);
  $('#userIntro').val(userInfo_obj.profile.introduction);
  $('#userSNA').val(userInfo_obj.profile.social_network_account);
  $('#userConnect').val(userInfo_obj.profile.connect);
  $('#userAddr').val(userInfo_obj.profile.address);
  $('#userSchool').val(userInfo_obj.profile.school);
  $('#userGrade').val(userInfo_obj.profile.grade);

  // $('#updateBtn').on('click',()=>{
  //   $.post('/api/updateProfile',{
  //     role:role,
  //     name:$('#userName').val(),
  //     intro:$('#userIntro').val(),
  //     sna:$('#userSNA').val(),
  //     connect:$('#userConnect').val(),
  //     addr:$('#userAddr').val(),
  //     school:$('#userSchool').val(),
  //     grade:$('#userGrade').val()
  //   },(data)=>{
  //
  //   })
  // })
})
