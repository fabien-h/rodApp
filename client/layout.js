/* **********
	Layout helpers
********** */
Template.layout.helpers({

	// The score variables
	rightCount: function() {
		return GameDatas.get('scoreRight');
	},
	totalCount: function() {
		return GameDatas.get('scoreTotal');
	},
	percentRight: function() {
		var percent = Math.round( GameDatas.get('scoreRight') / GameDatas.get('scoreTotal') * 100 );
		if( isNaN(percent) ) percent = 0;
		return percent;
	},


	// The bottom footer variables
	totalVoters: function() {
		if( Voters.findOne() ) return Voters.findOne().totalVoters;
		else return 'loading';
	},
	averageScore: function() {
		var totalVotes = 0,
			rightVotes = 0;

		_.each(Congressmen.find().fetch(), function(item){
			totalVotes += item.rvr;
			totalVotes += item.dvr;
			totalVotes += item.rvd;
			totalVotes += item.dvd;

			if( item.party === 'republican' ) {
				rightVotes += item.rvr;
				rightVotes += item.dvr;
			} else {
				rightVotes += item.rvd;
				rightVotes += item.dvd;
			}
		});

		return (rightVotes / totalVotes * 100).toFixed(2);
	}

});


Template.layout.created = function() {
};

Template.layout.rendered = function() {
};

Template.layout.destroyed = function() {
};
