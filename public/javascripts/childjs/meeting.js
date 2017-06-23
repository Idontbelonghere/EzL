var url = "http://web.wis.aodianyun.com/record.php?wisId=lc_74faa4427898a772ce4d678fc17175d1&power=60&expire=3966163200&rand=5641&dmn=&sign=nrsp37UdA9lK4MqCZjQA48b7UIA%3D&lock=0";
$(function() {
  $("#wisIframe").attr("src", url);
  $("#wisIframe").load(function() {
    WISExchange.Init({
      iframe: "wisIframe",
      onSuccess: function(info) {
        console.log("onSuccess", info);
      },
      onDocLoad: function(info) {
        console.log("onDocLoad", info);
      },
      onPageChange: function(info) {
        console.log("onPageChange", info);
      },
      onFailure: function(info) {
        console.log("onFailure", info.error);
      }
    });
  });
});
