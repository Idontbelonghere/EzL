$(function() {
  $('#signInBtn').on('click', function() {
    window.open('/login', '_self');
  });

  var reg_email = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
  $('#inputEmail').blur(() => {
    var tgt = $('#inputEmail').val();
    var x = reg_email.test(tgt);
    if (x) {
      $('#validateEmail').text('');
    } else {
      $('#validateEmail').text('Email Wrong Pattern.');
    }
  })
  $('#signupBtn').on('click', () => {
    if ($('#validateEmail').text() != '') {
      alert('Email Wrong Pattern.');
    } else {
      var un = $('#username').val();
      var em = $('#inputEmail').val();
      var pw = $('#pw').val();
      var pw_confirm = $('#pw_confirm').val();
      var invitationCode = $('#invitationCode').val();
      if (em && pw && (pw === pw_confirm) && invitationCode) {
        $.get('/ac/signup4teacher?username='+un+'&em=' + em + '&pw=' + pw+'&ic='+invitationCode, (d) => {
          if (d.ok == 1) {
            if (confirm('Sign Up succeed,go to Login page.')) {
              window.open('/login', '_self');
            }
          } else {
            alert('Wrong Invitation Code.');
          }
        })
      } else {
        alert('Password and Invitation Code can\'t be null, and the password needed to be confirmed for a second time.');
      }
    }
  })
});
