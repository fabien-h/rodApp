/* **********
	The includesFooter template will not render html, but will add javascripts to the page for analytics and social shares
********** */
var firstRun = true;
Template.includesFooter.rendered = function() {

	// To be sure to add the functions only one time
	if( firstRun ) {
		// Invalidate the first run
		firstRun = false;

		// Add the google analytics script to the page and execute a send
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		ga('create', 'UA-10949763-3', 'http://republicanordemocrat.meteor.com/');
		ga('send', 'pageview');

		// Add the twitter button
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

		// Add the facebook button
		(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1&appId=258537274308004"; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'));

		// Add the google plus button
		(function() {var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true; po.src = 'https://apis.google.com/js/platform.js'; var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s); })();
	};
};
