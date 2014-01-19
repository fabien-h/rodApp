/* **********
	Basic configuration for the Router
		=> iron router : https://github.com/EventedMind/iron-router

	events order :
		onBeforeRun
		before
		after
		onAfterRun
********** */
Router.configure({
	autoRender: false,
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',

	yieldTemplates: {
		'menu': {to: 'menu'},
		'includesFooter': {to: 'includesFooter'}
	},

	unload: function() {
	},

	onBeforeRun: function() {
	},

	before: function() {
	},

	after: function() {
		// Remove the active class on the menu links
		$('nav').find('a').removeClass('active');
		// Set the active class on active link
		$('nav').find('a#' + this.template).addClass('active');
	},

	onAfterRun: function() {
	}
});

/* **********
	Map all the roads of the application
********** */
Router.map(function () {

	this.route('game', {path: '/'});
	this.route('about', {path: '/about'});
	this.route('statistics', {path: '/statistics'});

});
