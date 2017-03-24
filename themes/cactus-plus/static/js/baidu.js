var me = document.querySelector('script[data-id][data-name="baiduAnalytics"]');
var baiduAnalytics = me.getAttribute('data-id');
var _hmt = _hmt || [];

(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?" + baiduAnalytics;
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
