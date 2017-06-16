/*
 * @Author: Idontbelonghere
 * @Date:   2016-10-09 15:40:35
 * @Last Modified by:   Idontbelonghere
 * @Last Modified time: 2017-02-09 15:27:04
 */

'use strict';
$(function() {
  var reg_email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
  $('#inputEmail').blur(() => {
    var tgt = $('#inputEmail').val();
    var x = reg_email.test(tgt);
    if (x) {
      $('#append1').text('');
    } else {
      $('#append1').text('Email Wrong Pattern.');
    }
  })
  $('#isTeacherBtn').on('click',function(){
    $('#isTeacherBtn span.glyphicon').toggleClass('glyphicon-remove');
    $('#isTeacherBtn span.glyphicon').toggleClass('glyphicon-ok');
    $(this).toggleClass('btn-danger');
    $(this).toggleClass('btn-success');
  })


  $('#loginBtn').on('click', () => {
    if ($('#append1').text() != '') {
      alert('Email Wrong Pattern.');
    } else {
      var em = $('#inputEmail').val();
      var pw = $('#pw').val();
      var r = $("#isTeacherBtn span.glyphicon").hasClass('glyphicon-ok');
      if (em && pw) {
        $.get('/ac/login?em=' + em + '&pw=' + pw+'&isT='+r, (d) => {
          if (d.status == 'ok') {
            window.open('/home','_self');
            var str_obj = JSON.stringify(d.data)
            sessionStorage.setItem("userInfo",str_obj);
          } else {
            alert('Account Not Exsist or Wrong Password');
          }
        })
      } else {
        alert('Wrong Input.');
      }
    }
  })

})
