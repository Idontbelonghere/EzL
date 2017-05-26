/*
* @Author: Idontbelonghere
* @Date:   2017-02-09 11:35:10
* @Last Modified by:   Idontbelonghere
* @Last Modified time: 2017-04-13 10:35:52
*/

'use strict';
$(function(){


  $('#usrName').text(sessionStorage.getItem("name"))
  $('#usrId').text(sessionStorage.getItem("id"))
  $('#instruction').text(sessionStorage.getItem("instruction"))
  $('#emailSpan').text(sessionStorage.getItem("contact"))

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
