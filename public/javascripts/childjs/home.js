'use strict';

$(function() {
  $(".btn-order").on('click', function() {
    $('#orderModal').modal('show');
  })

  $('#summernote').summernote({
    height: 400
  })

  $('#submitBtn').on('click', function() {
    var mc = $("#summernote").summernote('code');

  })

})
