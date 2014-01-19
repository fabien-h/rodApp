/* **********
	On the application startup
********** */
Meteor.startup(function(){

	console.log('**********************************');
	console.log('**********************************');
	console.log('REPUBLICAN OR DEMOCRAT IS STARTING');
	console.log('**********************************');
	console.log('**********************************');

	// Set the isOnboarding boolean to true in the GameDatas to init the game
	GameDatas.set('isOnboarding', true);

	// Set the display mode to question
	GameDatas.set('isDisplayModeQuestion', true);

	// Set the alreadyAnswered array in the GameDatas ; it will contain the ids of the congressmen the player already answered
	GameDatas.set('alreadyAnswered', []);

	// Set the score variables
	GameDatas.set('scoreTotal', 0);
	GameDatas.set('scoreRight', 0);

	// Set the sort mode of the statistics array on nameUp
	StatisticsModel.set('sortMode', 'name');
	StatisticsModel.set('sortOrder', 'up');

	// Subscribe to the databases
	Meteor.subscribe('congressmen', function(){
		console.log('Congressmen datas are loaded.');
	});
	Meteor.subscribe('voters', function(){
		console.log('Voters datas are loaded.');
	});

});
