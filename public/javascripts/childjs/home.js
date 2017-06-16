'use strict';

$(function() {
  var userInfo_str = sessionStorage.getItem("userInfo");
  var userInfo_obj = JSON.parse(userInfo_str);
  var role = userInfo_obj.role;

  if (role == 'student') {
    $.get('/home4student', function(data){
      $('#homeContent').html(data);
      var teacher,student;
      student = userInfo_obj._id;
      $(".btn-order").on('click', function() {
        $('#orderModal').modal('show');
        teacher = $(this).parent().parent().attr("teacherId");
        console.log(teacher);
      })

      $('#summernote').summernote({
        height: 400
      })

      $('#time .btn').on('click',function(){
        var x = $(this).html();
        console.log(x);
        $("#time").attr("time",x)
      })
      $('#saveQuestion').on('click', function() {
        var content = $("#summernote").summernote('code');
        var time = $("#time").attr('time');
        $.post('/api/saveQuestion',{
          content:content,
          time:time,
          student:student,
          teacher:teacher
        }, function(data){
          if(data.result.ok == 1){
            alert('Question Send')
            $('#orderModal').modal('hide');
          }else{
            alert('Question unSend')
          }
        })

      })
    })
  } else {
    $.get('/home4teacher', function(data){
      $('#homeContent').html(data);
    })
  }
});
