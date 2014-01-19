/* **********
	Functions called client side to update the datas
********** */
Meteor.methods({

	// The function to add a voter ; called when the onboarding question is replied
	addVoter: function(party) {

		// Adds a voter in the republicans or the democrates according to the party the user chose
		if( party === 'republican' ) Voters.update(Voters.findOne(), {$inc: {'republicanVoters': 1}});
		else Voters.update(Voters.findOne(), {$inc: {'democratVoters': 1}});

		// Adds a voter to the global voters list
		Voters.update(Voters.findOne(), {$inc: {'totalVoters': 1}});
	},

	// The function to update the datas of a congressman ; called when a user votes for a congressman
	updateCongressman: function(id, voter, voted) {

		// Update the base according to the vote that was done
		if( voter === 'democrate' && voted === 'democrate' )
			Congressmen.update(Congressmen.findOne({_id: id}), {$inc: {dvd: 1}});
		if( voter === 'democrate' && voted === 'republican' )
			Congressmen.update(Congressmen.findOne({_id: id}), {$inc: {dvr: 1}});
		if( voter === 'republican' && voted === 'democrate' )
			Congressmen.update(Congressmen.findOne({_id: id}), {$inc: {rvd: 1}});
		if( voter === 'republican' && voted === 'republican' )
			Congressmen.update(Congressmen.findOne({_id: id}), {$inc: {rvr: 1}});
	}
});
