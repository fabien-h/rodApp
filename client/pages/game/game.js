/* **********
	Game helpers
	return the username and the image URL
********** */
Template.game.helpers({

	// The question mode is set to true at init and will switch to false when we want to display an answer
	questionMode: function(){
		return GameDatas.get('isDisplayModeQuestion');
	},

	// The onboarding mode is set to true at init and will be set to false after
	onboardingMode: function() {
		return GameDatas.get('isOnboarding');
	},

	// The congressman datas
	congressman: function() {
		return GameDatas.get('currentCongressman');
	},

	// The results elements
	playerResult: function() {
		return GameDatas.get('playerResult');
	},
	demVotes: function() {
		return GameDatas.get('currentCongressman').dvd + GameDatas.get('currentCongressman').rvd;
	},
	demPercent: function() {
		var total = GameDatas.get('currentCongressman').dvd + GameDatas.get('currentCongressman').rvd + GameDatas.get('currentCongressman').dvr + GameDatas.get('currentCongressman').rvr;
		return Math.round( (GameDatas.get('currentCongressman').dvd + GameDatas.get('currentCongressman').rvd) / total * 100 );
	},
	repVotes: function() {
		return GameDatas.get('currentCongressman').dvr + GameDatas.get('currentCongressman').rvr;
	},
	repPercent: function() {
		var total = GameDatas.get('currentCongressman').dvd + GameDatas.get('currentCongressman').rvd + GameDatas.get('currentCongressman').dvr + GameDatas.get('currentCongressman').rvr;
		return Math.round( (GameDatas.get('currentCongressman').dvr + GameDatas.get('currentCongressman').rvr) / total * 100 );
	}
});


/* **********
	GameDatas : a reactive data source for the game template
********** */
GameDatas = {

	// Keys
	keys: {},

	// Deps : the same keys as in keys, but the values are Deps.Dependency instances like {"name": new Deps.Dependency}
	deps: {},

	// The get function
	get : function(key) {
		this.ensureDeps(key);
		this.deps[key].depend();
		return this.keys[key];
	},

	// The set function
	set: function(key, value) {
		this.ensureDeps(key);
		this.keys[key] = value;
		this.deps[key].changed();
	},

	// Make sure the Deps.Dependency is unique
	ensureDeps: function(key) {
		if( !this.deps[key] ) this.deps[key] = new Deps.Dependency;
	}
};


/* **********
	Add a listener on the view
	if the logout link is clicked, logout the user
********** */
Template.game.events({

	'click button.voteButton': function(e) {

		// If this is the onboarding mode, set the player orientation and start by displaying a first question
		if ( GameDatas.get('isOnboarding') ) {
			// Switch onboarding mode to false
			GameDatas.set('isOnboarding', false);
			// Set the party for the player
			GameDatas.set('playerParty', e.target.id);
			// Call the function that add a voter to the database
			Meteor.call('addVoter',GameDatas.get('playerParty'));
			// Display the first question
			Template.game.functions.displayNextQuestion();
		}

		// Else, test the answer
		else {

			// Update the user's score
			GameDatas.set('scoreTotal', GameDatas.get('scoreTotal') + 1)

			// Send the datas to the server
			Meteor.call('updateCongressman', GameDatas.get('currentCongressman')._id, GameDatas.get('playerParty'), e.target.id)

			// Tell if win or loose
			if( e.target.id === GameDatas.get('currentCongressman').party ){
				GameDatas.set('playerResult', 'YOU WIN !');
				GameDatas.set('scoreRight', GameDatas.get('scoreRight') + 1)
			}
			else GameDatas.set('playerResult', '<i style="color: #b00;">YOU LOOSE !</i>');

			// Change the display mode to answer
			GameDatas.set('isDisplayModeQuestion', false);

		}
	},

	'click button#goNext': function(e) {
		// Change the display mode to answer
		GameDatas.set('isDisplayModeQuestion', true);
		// Display the answer
		Template.game.functions.displayNextQuestion();
	}
});


/* **********
	Adds a listener when the template is rendered
********** */
Template.game.rendered = function() {

};


/* **********
	The functions for the game template
********** */
Template.game.functions = {

	// Display a question, is called after the first answer or after a click on a "next" button
	displayNextQuestion: function() {
		Template.game.functions.hideAnswer();

		// At first, select a target
		GameDatas.set('currentCongressman', Congressmen.findOne( {index: Math.floor( Math.random() * Congressmen.find().fetch().length )} ) );
	},


	// Hide the previous answer
	hideAnswer: function() {

	}
}
