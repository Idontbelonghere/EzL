/*
 * @Author: Idontbelonghere
 * @Date:   2016-04-11 15:20:08
 * @Last Modified by:   Idontbelonghere
 * @Last Modified time: 2017-04-25 14:25:03
 */

$(function() {
    $('.panel-success').collapse({
        toggle: true
    });
    var user_now = sessionStorage.getItem("user");
    var pw_now = sessionStorage.getItem("pw");

    var res;
    $.getJSON('/api/getProjHcdata', function(d) {
        res = d;
        $.each(d, function(index, value) {
            var t = [];
            var NIPair = {};
            $.each(value.runs, function(ind, val) {
                var run_name = val.name;
                t.push([run_name, val.bug_num]);
                NIPair[run_name] = val.runid;
            });
            var seriesData = t.slice(-10);
            var chart1 = new Highcharts.Chart({
                chart: {
                    type: 'column',
                    renderTo: 'container_' + index
                },
                title: {
                    text: 'every Run\'s Bugs of Project'
                },
                subtitle: {
                    text: 'Source: ' + value.project
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'BUG Number'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        // pointWidth: 50,
                        cursor: 'pointer',
                        point: {
                            events: {
                                click: function() {
                                    window.open('/runSummary?rn=' + this.name + '&runId=' + NIPair[this.name], '_self');
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'bug number',
                    data: seriesData,
                    color: '#744CCC',
                    dataLabels: {
                        enabled: true,
                        color: '#FFFFFF',
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans -serif'
                        }
                    }
                }]
            });
        })
    });

    $('.projH').on('click', function() {
        var name = $(this).html();
        window.open('/projOverview?pn=' + name, '_self');
    })

    $('#createPj').on('click', function() {
        $.getJSON('/ac/authPermission?user=' + user_now + '&pw=' + pw_now, (d_p) => {
            if (d_p.permission == 'rw' || d_p.permission == 'admin') {
                var v = $('#pjN').val();
                if (v == '') {
                    alert('Project Name Can\'t be Null.');
                } else {
                    v = v.toUpperCase();
                    $.getJSON('/api/createProject?pjn=' + v, function(d) {
                        var str = '';
                        d.result.forEach(function(val, ind, arr) {
                            if (val.ok == 0) {
                                str = str + val.name + ' ';
                            }
                        })
                        if (str == '') {
                            alert('Done.')
                        } else {
                            alert(str + ' got wrong.');
                        }
                        // if (d.ok == 1) {
                        //     if (confirm('Project ' + v + ' is created successfully.')) {
                        //         // window.location.reload();
                        //     }
                        // } else if (d.ok == 2) {
                        //     alert('Project ' + v + ' allready exsisted, You don\'t need to CREATE it.');
                        // } else {
                        //     alert('Something wrong, maybe you haven\'t initialized Db.');
                        // }
                    })
                }
            } else {
                alert('You don\'t have the permission.');
            }
        })
    })


    $('.btnBT').on('click', function() {
        $(this).toggleClass('BtActive');
    })

    $('.btnDt').on('click', function() {
        $(this).addClass('BtActive');
        $(this).siblings().removeClass('BtActive');
    })

    //send data to local
    $('#sdtL').on('click', function() {
            var s = "mongodb://localhost:27017/bv_PE";

            $.get('/api/setDataTo?s=' + s, (d) => {
                if (d.status == 'ok') {
                    console.log('done.')
                } else {
                    console.log('Can not set dataTo.')
                }
            })
        })
        //send data to remote
    $('#sdtR').on('click', function() {
        var s = "mongodb://dev:dev@10.3.1.13:27017/dev";
        $.get('/api/setDataTo?s=' + s, (d) => {
            if (d.status == 'ok') {
                console.log('done.')
            } else {
                console.log('Can not set dataTo.')
            }
        })
    })

    function whetherOk(s) {
        if (s == 'ok') {
            alert('Mission Complete.')
            window.location.reload();
        } else {
            alert('Mission Failed, Something got wrong.')
        }
    }


    $('#execMkb').on('click', function() {
        $.getJSON('/ac/authPermission?user=' + user_now + '&pw=' + pw_now, (d_p) => {
            if (d_p.permission == 'rw' || d_p.permission == 'admin') {
                var script = 'mkb';
                var mkbP = $('#mkbObjdir').val();
                var pn = $('#mkbPn').val();
                pn = pn.toUpperCase();
                var btArr = [];
                $('.BtActive').each(function(i, elem) {
                    btArr.push($(this).text());
                })
                var ec = $('#createProjCB').prop('checked');
                var bt = btArr.join(',');
                bt = $.trim(bt);
                $('#pg').show();
                sessionStorage.setItem("pgBar", "1");
                $.getJSON('/api/checkPnExsist?pjn=' + pn, (res) => {
                    if (res.ok == 1 && ec == true) {
                        alert('Project ' + pn + ' allready exsisted, You don\'t need to CREATE it.');
                        $('#pg').hide();
                        sessionStorage.setItem("pgBar", "0");
                    } else if (res.ok == 0 && ec == false) {
                        alert('Project ' + pn + ' doesn\'t exsist, You need to CREATE it.');
                        $('#pg').hide();
                        sessionStorage.setItem("pgBar", "0");
                    } else {
                        $.getJSON('/api/checkLock', (k) => {
                            if (k.lock) {
                                alert('Someone is using Remote Database.Please wait utill Remote Database sets free');
                                $('#pg').hide();
                                sessionStorage.setItem("pgBar", "0");
                            } else {
                                $.getJSON('/api/setLock?v=1', (d) => {
                                    console.log(d);
                                })
                                $.getJSON('/api/exeScript_mkb?s=' + script + '_for_bv.sh&pjp=' + mkbP + '&pn=' + pn + '&bt=' + bt + '&ec=' + ec, (d) => {
                                    $('#pg').hide();
                                    sessionStorage.setItem("pgBar", "0");
                                    whetherOk(d.status);
                                    $.getJSON('/api/setLock?v=0', (d2) => {
                                        console.log(d2);
                                    })
                                })
                            }
                        })
                    }
                })
            } else {
                alert('You don\'t have the permission.');
            }
        })
    })

    $('#executeScript').on('click', function() {
        $.getJSON('/ac/authPermission?user=' + user_now + '&pw=' + pw_now, (d_p) => {
            if (d_p.permission == 'rw' || d_p.permission == 'admin') {
                var script = $('#sltScript').val();

                var fbP = $('#fbTgtPath').val();
                var pmdP = $('#pmdTgtPath').val();
                var csP = $('#csTgtPath').val();

                var rp = $('#rootPath').val();
                var pn = $('#tgtPjN').val();

                switch (script) {

                    case 'findbug':
                        $.getJSON('/api/exeScript?s=' + script + '_for_bv.sh&pjp=' + fbP + '&rp=' + rp + '&pn=' + pn, (d) => {
                            whetherOk(d.status);
                        })
                        break;
                    case 'pmd':
                        $.getJSON('/api/exeScript?s=' + script + '_for_bv.sh&pjp=' + pmdP + '&rp=' + rp + '&pn=' + pn, (d) => {
                            whetherOk(d.status);
                        })
                        break;
                    case 'checkstyle':
                        $.getJSON('/api/exeScript?s=' + script + '_for_bv.sh&pjp=' + csP + '&rp=' + rp + '&pn=' + pn, (d) => {
                            whetherOk(d.status);
                        })
                        break;
                    case 'All_in_one':
                        $.getJSON('/api/exeScript_aio?s=' + script + '_for_bv.sh&fbP=' + fbP + '&pmdP=' + pmdP + '&csP=' + csP + '&rp=' + rp + '&pn=' + pn, (d) => {
                            whetherOk(d.status);
                        })
                        break;
                }
            } else {
                alert('You don\'t have the permission.');
            }
        })
    })


    $('#resetDb').on('click', function() {
        $.getJSON('/ac/authPermission?user=' + user_now + '&pw=' + pw_now, (d_p) => {
            if (d_p.permission == 'rw' || d_p.permission == 'admin') {
                $.getJSON('/api/resetDb', (d) => {
                    var msg, box;
                    console.log(d);
                    if (d.result.ok == 1) {
                        msg = 'Database reset.';
                        box = '<div class="alert alert-success alert-dismissible alertbox" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>' + msg + '</strong></div>';
                    } else {
                        msg = 'Something is wrong while reseting the database.';
                        box = '<div class="alert alert-danger alert-dismissible alertbox" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>' + msg + '</strong></div>';
                    }

                    $('#fm0').append(box);
                })
            } else {
                alert('You don\'t have the permission.');
            }
        })


    })
    $('#initializeDb').on('click', function() {
        $.getJSON('/ac/authPermission?user=' + user_now + '&pw=' + pw_now, (d_p) => {
            if (d_p.permission == 'rw' || d_p.permission == 'admin') {
                $.getJSON('/api/initializeDb', (d) => {
                    var msg, box;
                    console.log(d);
                    if (d.result.ok == 1) {
                        msg = 'Database Initialized.';
                        box = '<div class="alert alert-success alert-dismissible alertbox" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>' + msg + '</strong></div>';
                    } else if (d.result.ok == 2) {
                        msg = d.msg;
                        box = '<div class="alert alert-info alert-dismissible alertbox" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>' + msg + '</strong></div>';
                    } else {
                        msg = 'Something is wrong while initializing the database.'
                        box = '<div class="alert alert-danger alert-dismissible alertbox" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>' + msg + '</strong></div>';
                    }

                    $('#fm0').append(box);
                })
            } else {
                alert('You don\'t have the permission.');
            }
        })
    })


    $('.deleteProj').on('click', function() {
        $.getJSON('/ac/authPermission?user=' + user_now + '&pw=' + pw_now, (d_p) => {
            if (d_p.permission == 'rw' || d_p.permission == 'admin') {
                var projN = $(this).attr('proj');
                $.getJSON('/api/deleteProj?projN=' + projN, (d) => {
                    alert(projN + ' is removed.');
                    window.location.reload();
                });
            } else {
                alert('You don\'t have the permission.');
            }
        })
    })

    $('.logsView').on('click', function() {
        $('.rnameList').html('');
        $('.logsContent').html('');
        var projN = $(this).attr('proj');
        $.getJSON('/api/getLogsView?pjn=' + projN, (d) => {
            $.each(d, function(ind,val){
                var s = "<li class='list-group-item logsLi' logsId='"+ind+"'>"+val.run_name+"</option>";
                $('.rnameList').append($(s));
            })
            $('.logsLi').on('click', function(){
                var v = $(this).attr("logsId");
                $('.logsContent').html($(d[v].content));
            })

            $('#logsModal').modal('show');
        })
    })


});
