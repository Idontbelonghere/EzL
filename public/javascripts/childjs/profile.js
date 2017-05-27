/*
* @Author: Idontbelonghere
* @Date:   2017-02-09 11:35:10
* @Last Modified by:   Idontbelonghere
* @Last Modified time: 2017-04-13 10:35:52
*/

'use strict';
$(function(){
  var userInfo_str = sessionStorage.getItem("userInfo");
  var userInfo_obj = JSON.parse(userInfo_str);

  $('#usrName').text(userInfo_obj.profile.name)
  $('#usrId').text(userInfo_obj.accountId)
  $('#instruction').text(userInfo_obj.profile.instruction)
  $('#emailSpan').text(userInfo_obj.account)

  //change avatar.
  $('#uploadAvatar').on('change', function(){
    var selectedFile = $('#uploadAvatar')[0].files[0];
    $('#imgPreview').modal('show');
    var imgSrc =window.URL.createObjectURL(selectedFile);
    var img = "<img height='250px' width='250px' src='"+imgSrc+"'>";
    $('#imgPreviewBox').append(img);
  })
  $('.avatarLarge').tooltip();
  $('.avatarLarge').on('click', function(){
    $('#uploadAvatar').click();
  })
  //add Groups(dbs)
})
