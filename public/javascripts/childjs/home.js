'use strict';

$(function() {
  var userInfo_str = sessionStorage.getItem("userInfo");
  var userInfo_obj = JSON.parse(userInfo_str);
  var role = userInfo_obj.role;
  var socket = io();
  socket.on('connect', ()=>{
    var obj = {
      "socketId":socket.id,
      "role":role,
      "userId":userInfo_obj._id
    };
    socket.emit('add_user',obj);
  })
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
            alert('Question Send');
            let msg = {
              student:student,
              teacher:teacher,
              content:content,
              time:time
            }
            socket.emit('connect_teacher',msg);
            $('#orderModal').modal('hide');
          }else{
            alert('Question unSend')
          }
        })

      })
      socket.on('teacher_connected',(msg)=>{
        window.open('/meeting?teacher='+msg.teacher+'&student='+student,'_blank');
      })

    })

  } else {
    $.get('/home4teacher', function(data){
      let teacher = userInfo_obj._id;
      $('#homeContent').html(data);
      socket.on('get_connect', (msg)=>{
        console.log('????????????????GET CONNECT!!');
        var x =
        `<div class="questionBox">
            <p class="fromStudent">
              From Stu:
              <span>${msg.student}</span>
            </p>
            <p class="content">
              Q:
              <span>${msg.content}</span>
            </p>
            <p class="time">
              Time:
              <span>${msg.time}</span>
            </p>
            <button class="btn btn-success reqAccecptBtn">ACCEPT</button>
            <button class="btn btn-danger reqRejectBtn">REJECT</button>
         </div>`;
        $('#realTimeConnect').html(x);
      });

      $('.reqAccecptBtn').on('click', ()=>{

        let fromstudent = $(this).parent().find('p.fromStudent span').html();
        // fromstudent = $.trim(fromstudent);
        let rep = {
          teacher:teacher,
          student:fromstudent,
          value:1
        };

        socket.emit('replyFromTeacher',rep);
        window.open('/meeting?teacher='+teacher+'&student='+fromstudent,'_blank');

      })
    })

  }
});
