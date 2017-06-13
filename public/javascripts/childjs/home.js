'use strict';

$(function() {
  $(".btn-order").on('click', function() {
    $('#orderModal').modal('show');
  })

  $('#summernote').summernote({
    height: 400
  })

  $('#time .btn').on('click',function(){
    var x = $(this).html();
    console.log(x);
    $("#time").attr("time",x)
  })
  $('#sendQuestion').on('click', function() {
    var mc = $("#summernote").summernote('code');
    var time = $("#time").attr('time');
    // $.post

  })

})
