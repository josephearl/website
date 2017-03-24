var me = document.querySelector('script[data-id][data-name="duoshuoShortname"]');
var short_name = me.getAttribute('data-id');

var duoshuoQuery = {short_name: short_name };
	(function() {
		var ds = document.createElement('script');
		ds.type = 'text/javascript';ds.async = true;
		ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
		ds.charset = 'UTF-8';
		(document.getElementsByTagName('head')[0]
		 || document.getElementsByTagName('body')[0]).appendChild(ds);
	})();
