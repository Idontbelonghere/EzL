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
    $('#loginBtn').on('click', () => {
        if ($('#append1').text() != '') {
            alert('Email Wrong Pattern.');
        } else {
            var em = $('#inputEmail').val();
            var pw = $('#pw').val();
            if (em && pw) {
                $.get('/ac/login?em=' + em + '&pw=' + pw, (d) => {
                    if (d.status == 'ok') {
                        var s = "{\"mongo_Address\": \"" + d.db + "\"}";
                        $.get('/api/setDb_now?s=' + s, (doc) => {
                            if (doc.status == 'ok') {
                                sessionStorage.setItem("user", em);
                                sessionStorage.setItem("pw", d.pw_encode);
                                sessionStorage.setItem("permission", d.permission);
                                sessionStorage.setItem("db", d.db);
                                sessionStorage.setItem("name", d.name);
                                sessionStorage.setItem("id", d.id);
                                sessionStorage.setItem("contact", d.contact);
                                sessionStorage.setItem("introduction", d.introduction);
                                console.log('login succeed');
                                setTimeout(function() { window.open('/', '_self'); }, 1000);
                            }
                        });


                    } else {
                        alert('Account Not Exsist or Wrong Password');
                    }
                })
            } else {
                alert('Wrong Input.');
            }
        }
    })

    $('#signupBtn').on('click', () => {
        if ($('#append1').text() != '') {
            alert('Email Wrong Pattern.');
        } else {
            var em = $('#inputEmail').val();
            var pw = $('#pw').val();
            if (em && pw) {
                $.get('/ac/signup?em=' + em + '&pw=' + pw, (d) => {
                    if (d.ok == 1) {
                        alert('Sign Up Succeed.');
                    } else {
                        alert('wrong when write in db.')
                    }
                })
            } else {
                alert('Wrong Input.');
            }
        }
    })

    $("#onlineBtn").on('click', () => {
        $('#chooseVersion').hide();
        $('#onlineLoginPage').show();
    })
    $("#getbackBtn").on('click', () => {
        $('#chooseVersion').show();
        $('#onlineLoginPage').hide();
    })
    $("#offlineBtn").on('click', () => {
        var s = "{\"mongo_Address\": \"mongodb://localhost:27017/bv_PE\"}";
        $.get('/api/setDb_now?s=' + s, (d) => {
            if (d.status == 'ok') {
                sessionStorage.clear();
                sessionStorage.setItem("user", "offline");
                sessionStorage.setItem("permission", "all");
                sessionStorage.setItem("db", "mongodb://localhost:27017/bv_PE");
                sessionStorage.setItem("name", "Offline");
                sessionStorage.setItem("id", "someID");
                sessionStorage.setItem("contact", "..");
                sessionStorage.setItem("introduction", "offline-style-instructions");
                setTimeout(function() { window.open('/', '_self'); }, 1000);

            } else {
                console.log('changing dba error.')
            }
        })

    })

})
