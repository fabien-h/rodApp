/* **********
	StatisticsModel : a reactive data source for the game template
********** */
StatisticsModel = {

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
	Utilities variables and datas
********** */
// A boolean to check if this is the first update run
var firstRun = true;
// A boolean to check if the datas are uptodate (used to debounce the page update)
var uptodateDatas = false;
// The static datas
StatisticsModel.set('staticDatas', null);
// The congressmen array
StatisticsModel.set('congressmenArray', null);



/* **********
	Statistics helpers
	return the username and the image URL
********** */
Template.statistics.helpers({

	// Define an object with the static datas about the congressmen
	// This object is not supposed to be updated after the initialisation
	staticDatas: function() {
		return StatisticsModel.get('staticDatas');
	},

	// Define an oject with the dynamic datas about the players
	playersDatas: function() {
		return buildDataSet();
	}

});




/* **********
	Debouce the datas update
	Every 200ms, set it back to false
********** */
Meteor.setInterval(function(){ uptodateDatas = false; }, 200)




/* **********
	Add a listener on the view
	if the logout link is clicked, logout the user
********** */
Template.statistics.events({

});




/* **********
	The function to build the data set for the statistic page
********** */
var buildDataSet = function() {

	if( uptodateDatas ) {

			return StatisticsModel.get('tempDatas');

		} else if ( Voters.find().fetch().length > 0 && Congressmen.find().fetch().length > 0 ) {

			// Base variables
			var datas = {},
				rvr = 0,
				rvd = 0,
				dvd = 0,
				dvr = 0,
				rightVotes = 0,
				repRightVotes = 0,
				demRightVotes = 0,
				totalCongressmen = 0,
				totalDems = 0,
				totalReps = 0,

				totalFemale = 0,
				totalMoustache = 0,
				totalBeard = 0,
				totalBald = 0,
				totalGlasses = 0,
				totalWhite = 0,
				totalBlack = 0,
				totalHispanic = 0,
				totalAsian = 0,
				totalBlackHair = 0,
				totalBrownHairs = 0,
				totalAuburnHair = 0,
				totalBlondeHair = 0,
				totalGreyHairs = 0,

				demCongressMen = [],
				totalDemFemale = 0,
				totalDemMoustache = 0,
				totalDemBeard = 0,
				totalDemBald = 0,
				totalDemGlasses = 0,
				totalDemWhite = 0,
				totalDemBlack = 0,
				totalDemHispanic = 0,
				totalDemAsian = 0,
				totalDemBlackHair = 0,
				totalDemBrownHairs = 0,
				totalDemAuburnHair = 0,
				totalDemBlondeHair = 0,
				totalDemGreyHairs = 0,

				repCongressMen = [],
				totalRepFemale = 0,
				totalRepMoustache = 0,
				totalRepBeard = 0,
				totalRepBald = 0,
				totalRepGlasses = 0,
				totalRepWhite = 0,
				totalRepBlack = 0,
				totalRepHispanic = 0,
				totalRepAsian = 0,
				totalRepBlackHair = 0,
				totalRepBrownHairs = 0,
				totalRepAuburnHair = 0,
				totalRepBlondeHair = 0,
				totalRepGreyHairs = 0,

				agePyramid = [],
				demAgePyramid = [],
				repAgePyramid = [],
				currentYear = new Date().getFullYear(),

				congressmens = [];

			// Build the age pyamid
			for (var i = 95; i >= 30; i--) {
				agePyramid.push(0);
				demAgePyramid.push(0);
				repAgePyramid.push(0);
			};

			// Loop on each congressman
			var baseCongressmenArray = Congressmen.find().fetch();
			_.each(baseCongressmenArray, function(item){

				rvr += item.rvr;
				dvr += item.dvr;
				rvd += item.rvd;
				dvd += item.dvd;

				totalCongressmen++;

				var goodGuessPercent = 0,
					localTotal = item.rvr + item.dvr + item.rvd + item.dvd;

				if( item.party === 'republican' ) {

					item.rightVotes = item.rvr + item.dvr;
					item.rightVotesPercent = ( item.rightVotes / (item.rvr + item.dvr + item.rvd + item.dvd) * 100 ).toFixed(2);
					item.rightVotesPercentRounded = ( parseInt(item.rightVotesPercent) ).toFixed(0);
					rightVotes += item.rightVotes;
					repRightVotes += item.rvr;
					demRightVotes += item.dvr;
					goodGuessPercent += item.rvr + item.dvr;
					totalReps++;
					repCongressMen.push(item.race);
					repAgePyramid[currentYear - item.born - 30]++;

					if( item.sex === 'f') totalRepFemale++;
					if( item.moustache === true) totalRepMoustache++;
					if( item.beard === true) totalRepBeard++;
					if( item.bald === true) totalRepBald++;
					if( item.glasses === true) totalRepGlasses++;
					if( item.race === 'white') totalRepWhite++;
					if( item.race === 'black') totalRepBlack++;
					if( item.race === 'hispanic') totalRepHispanic++;
					if( item.race === 'asian') totalRepAsian++;
					if( item.haircolor === 'black') totalRepBlackHair++;
					if( item.haircolor === 'brown') totalRepBrownHairs++;
					if( item.haircolor === 'auburn') totalRepAuburnHair++;
					if( item.haircolor === 'blonde') totalRepBlondeHair++;
					if( item.haircolor === 'white') totalRepGreyHairs++;

				} else {

					item.rightVotes = item.rvd + item.dvd;
					item.rightVotesPercent = ( item.rightVotes / (item.rvr + item.dvr + item.rvd + item.dvd) * 100 ).toFixed(2);
					item.rightVotesPercentRounded = ( parseInt(item.rightVotesPercent) ).toFixed(0);
					rightVotes += item.rightVotes;
					repRightVotes += item.rvd;
					demRightVotes += item.dvd;
					goodGuessPercent += item.rvd + item.dvd;
					totalDems++;
					demCongressMen.push(item.race)
					demAgePyramid[currentYear - item.born - 30]++;

					if( item.sex === 'f') totalDemFemale++;
					if( item.moustache === true) totalDemMoustache++;
					if( item.beard === true) totalDemBeard++;
					if( item.bald === true) totalDemBald++;
					if( item.glasses === true) totalDemGlasses++;
					if( item.race === 'white') totalDemWhite++;
					if( item.race === 'black') totalDemBlack++;
					if( item.race === 'hispanic') totalDemHispanic++;
					if( item.race === 'asian') totalDemAsian++;
					if( item.haircolor === 'black') totalDemBlackHair++;
					if( item.haircolor === 'brown') totalDemBrownHairs++;
					if( item.haircolor === 'auburn') totalDemAuburnHair++;
					if( item.haircolor === 'blonde') totalDemBlondeHair++;
					if( item.haircolor === 'white') totalDemGreyHairs++;

				}

				if( item.sex === 'f') totalFemale++;
				if( item.moustache === true) totalMoustache++;
				if( item.beard === true) totalBeard++;
				if( item.bald === true) totalBald++;
				if( item.glasses === true) totalGlasses++;
				if( item.race === 'white') totalWhite++;
				if( item.race === 'black') totalBlack++;
				if( item.race === 'hispanic') totalHispanic++;
				if( item.race === 'asian') totalAsian++;
				if( item.haircolor === 'black') totalBlackHair++;
				if( item.haircolor === 'brown') totalBrownHairs++;
				if( item.haircolor === 'auburn') totalAuburnHair++;
				if( item.haircolor === 'blonde') totalBlondeHair++;
				if( item.haircolor === 'white') totalGreyHairs++;

				congressmens.push({
					name: item.name,
					index: item.index,
					party: item.party,
					goodGuessPercent: (goodGuessPercent / localTotal * 100).toFixed(2)
				});
			});

			datas.worstTenCongressmen = _.sortBy( baseCongressmenArray, function(item) {return item.rightVotesPercent;}).slice(0, 10);
			datas.topTenCongressmen = _.sortBy( baseCongressmenArray, function(item) {return item.rightVotesPercent;}).reverse().slice(0, 10);

			datas.congressmens = congressmens;

			// Inject the variables in the datas object
			datas.totalVotes = rvr + dvr + rvd + dvd;
			datas.repVotes = rvr + rvd;
			datas.demVotes = dvr + dvd;
			datas.rvr = rvr;
			datas.rvd = rvd;
			datas.dvd = dvd;
			datas.dvr = dvr;
			datas.averageScore = ( rightVotes / datas.totalVotes * 100 ).toFixed(2);
			datas.repRightVotes = ( repRightVotes / datas.repVotes * 100 ).toFixed(2);
			datas.demRightVotes = ( demRightVotes / datas.demVotes * 100 ).toFixed(2);
			datas.totalCongressmen = totalCongressmen;
			datas.totalReps = totalReps;
			datas.repCongressMen = repCongressMen.sort().reverse();
			datas.totalDems = totalDems;
			datas.demCongressMen = demCongressMen.sort().reverse();
			datas.percentDems = ( totalDems / totalCongressmen * 100 ).toFixed(2);
			datas.percentReps = ( totalReps / totalCongressmen * 100 ).toFixed(2);

			datas.totalFemale = totalFemale;
			datas.PercentFemale = ( totalFemale / totalCongressmen * 100 ).toFixed(2);
			datas.totalMoustache = totalMoustache;
			datas.PercentMoustache = ( totalMoustache / totalCongressmen * 100 ).toFixed(2);
			datas.totalBeard = totalBeard;
			datas.PercentBeard = ( totalBeard / totalCongressmen * 100 ).toFixed(2);
			datas.totalBald = totalBald;
			datas.PercentBald = ( totalBald / totalCongressmen * 100 ).toFixed(2);
			datas.totalGlasses = totalGlasses;
			datas.PercentGlasses = ( totalGlasses / totalCongressmen * 100 ).toFixed(2);
			datas.totalWhite = totalWhite;
			datas.PercentWhite = ( totalWhite / totalCongressmen * 100 ).toFixed(2);
			datas.totalBlack = totalBlack;
			datas.PercentBlack = ( totalBlack / totalCongressmen * 100 ).toFixed(2);
			datas.totalHispanic = totalHispanic;
			datas.PercentHispanic = ( totalHispanic / totalCongressmen * 100 ).toFixed(2);
			datas.totalAsian = totalAsian;
			datas.PercentAsian = ( totalAsian / totalCongressmen * 100 ).toFixed(2);
			datas.totalBlackHair = totalBlackHair;
			datas.PercentBlackHair = ( totalBlackHair / totalCongressmen * 100 ).toFixed(2);
			datas.totalBrownHairs = totalBrownHairs;
			datas.PercentBrownHairs = ( totalBrownHairs / totalCongressmen * 100 ).toFixed(2);
			datas.totalAuburnHair = totalAuburnHair;
			datas.PercentAuburnHair = ( totalAuburnHair / totalCongressmen * 100 ).toFixed(2);
			datas.totalBlondeHair = totalBlondeHair;
			datas.PercentBlondeHair = ( totalBlondeHair / totalCongressmen * 100 ).toFixed(2);
			datas.totalGreyHairs = totalGreyHairs;
			datas.PercentGreyHairs = ( totalGreyHairs / totalCongressmen * 100 ).toFixed(2);

			datas.totalDemFemale = totalDemFemale;
			datas.totalDemMale = totalDems - totalDemFemale;
			datas.PercentDemFemale = ( totalDemFemale / totalDems * 100 ).toFixed(2);
			datas.PercentDemMale = ( 100 - datas.PercentDemFemale ).toFixed(2);
			datas.totalDemMoustache = totalDemMoustache;
			datas.PercentDemMoustache = ( totalDemMoustache / totalDems * 100 ).toFixed(2);
			datas.totalDemBeard = totalDemBeard;
			datas.PercentDemBeard = ( totalDemBeard / totalDems * 100 ).toFixed(2);
			datas.totalDemBald = totalDemBald;
			datas.PercentDemBald = ( totalDemBald / totalDems * 100 ).toFixed(2);
			datas.totalDemGlasses = totalDemGlasses;
			datas.PercentDemGlasses = ( totalDemGlasses / totalDems * 100 ).toFixed(2);
			datas.totalDemWhite = totalDemWhite;
			datas.PercentDemWhite = ( totalDemWhite / totalDems * 100 ).toFixed(2);
			datas.totalDemBlack = totalDemBlack;
			datas.PercentDemBlack = ( totalDemBlack / totalDems * 100 ).toFixed(2);
			datas.totalDemHispanic = totalDemHispanic;
			datas.PercentDemHispanic = ( totalDemHispanic / totalDems * 100 ).toFixed(2);
			datas.totalDemAsian = totalDemAsian;
			datas.PercentDemAsian = ( totalDemAsian / totalDems * 100 ).toFixed(2);
			datas.totalDemBlackHair = totalDemBlackHair;
			datas.PercentDemBlackHair = ( totalDemBlackHair / totalDems * 100 ).toFixed(2);
			datas.totalDemBrownHairs = totalDemBrownHairs;
			datas.PercentDemBrownHairs = ( totalDemBrownHairs / totalDems * 100 ).toFixed(2);
			datas.totalDemAuburnHair = totalDemAuburnHair;
			datas.PercentDemAuburnHair = ( totalDemAuburnHair / totalDems * 100 ).toFixed(2);
			datas.totalDemBlondeHair = totalDemBlondeHair;
			datas.PercentDemBlondeHair = ( totalDemBlondeHair / totalDems * 100 ).toFixed(2);
			datas.totalDemGreyHairs = totalDemGreyHairs;
			datas.PercentDemGreyHairs = ( totalDemGreyHairs / totalDems * 100 ).toFixed(2);

			datas.totalRepFemale = totalRepFemale;
			datas.totalRepMale = totalReps - totalRepFemale;
			datas.PercentRepFemale = ( totalRepFemale / totalReps * 100 ).toFixed(2);
			datas.PercentRepMale = ( 100 - datas.PercentRepFemale ).toFixed(2);
			datas.totalRepMoustache = totalRepMoustache;
			datas.PercentRepMoustache = ( totalRepMoustache / totalReps * 100 ).toFixed(2);
			datas.totalRepBeard = totalRepBeard;
			datas.PercentRepBeard = ( totalRepBeard / totalReps * 100 ).toFixed(2);
			datas.totalRepBald = totalRepBald;
			datas.PercentRepBald = ( totalRepBald / totalReps * 100 ).toFixed(2);
			datas.totalRepGlasses = totalRepGlasses;
			datas.PercentRepGlasses = ( totalRepGlasses / totalReps * 100 ).toFixed(2);
			datas.totalRepWhite = totalRepWhite;
			datas.PercentRepWhite = ( totalRepWhite / totalReps * 100 ).toFixed(2);
			datas.totalRepBlack = totalRepBlack;
			datas.PercentRepBlack = ( totalRepBlack / totalReps * 100 ).toFixed(2);
			datas.totalRepHispanic = totalRepHispanic;
			datas.PercentRepHispanic = ( totalRepHispanic / totalReps * 100 ).toFixed(2);
			datas.totalRepAsian = totalRepAsian;
			datas.PercentRepAsian = ( totalRepAsian / totalReps * 100 ).toFixed(2);
			datas.totalRepBlackHair = totalRepBlackHair;
			datas.PercentRepBlackHair = ( totalRepBlackHair / totalReps * 100 ).toFixed(2);
			datas.totalRepBrownHairs = totalRepBrownHairs;
			datas.PercentRepBrownHairs = ( totalRepBrownHairs / totalReps * 100 ).toFixed(2);
			datas.totalRepAuburnHair = totalRepAuburnHair;
			datas.PercentRepAuburnHair = ( totalRepAuburnHair / totalReps * 100 ).toFixed(2);
			datas.totalRepBlondeHair = totalRepBlondeHair;
			datas.PercentRepBlondeHair = ( totalRepBlondeHair / totalReps * 100 ).toFixed(2);
			datas.totalRepGreyHairs = totalRepGreyHairs;
			datas.PercentRepGreyHairs = ( totalRepGreyHairs / totalReps * 100 ).toFixed(2);

			datas.demAgePyramid = demAgePyramid;
			datas.demAverageAge = ( _.reduce(demAgePyramid, function(memo, num, index){ return memo + (num * (index + 30)); }, 0) / totalDems ).toFixed(2);
			datas.repAgePyramid = repAgePyramid;
			datas.repAverageAge = ( _.reduce(repAgePyramid, function(memo, num, index){ return memo + (num * (index + 30)); }, 0) / totalReps ).toFixed(2);

			// Get the datas from the Voters base
			if( Voters.findOne() ) {
				datas.totalVoters = Voters.findOne().totalVoters;
				datas.republicanVoters = Voters.findOne().republicanVoters;
				datas.democratVoters = Voters.findOne().democratVoters;
				datas.percentDem = ( datas.democratVoters / datas.totalVoters * 100 ).toFixed(2);
				datas.percentRep = ( 100 - parseFloat(datas.percentDem) ).toFixed(2);
				datas.votesPerPlayer = ( datas.totalVotes / datas.totalVoters ).toFixed(2);
			}

			// Set a temporary data set and set the uptodate boolean to true
			// The function will return the temporary data set untill the interval reseted the boolean
			StatisticsModel.set('tempDatas', datas);
			uptodateDatas = true;

			// If this is the first run, set the basic datas for the statics datas and the congressmen array
			if( firstRun ) setFirstRunDatas(datas);
			firstRun = false; // Then invalidate the first run

			//console.log('je recompute tout');

			return datas;

		} else {
			return null;
		}
};



var congressmenList = null;
/* **********
	On render, reset the firstrun boolean
********** */
Template.statistics.rendered = function(){
	if( StatisticsModel.get('staticDatas') ) {
		congressmenList = new List('representantList', {
			//valueNames: [ 'name', 'party', 'goodGuessPercent' ],
			item: '<li><span class="name"></span><span class="party"></span><span class="goodGuessPercent"></span></li>',
			page: 500,
			i: 1,
			sortClass: 'sort'
		}, StatisticsModel.get('staticDatas').congressmens);
	}
};
// Destroy the list when the template is destroyed
Template.statistics.destroyed = function ( ) { congressmenList = null; };




/* **********
	The function that set the initial datas in the static datas and the congressmen array
********** */
var setFirstRunDatas = function(datas) {
	StatisticsModel.set('staticDatas', datas);
};
