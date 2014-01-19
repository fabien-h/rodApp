/* **********
	Defines the server publications
********** */
Meteor.publish('congressmen', function() {
	return Congressmen.find();
});
Meteor.publish('voters', function() {
	return Voters.find();
});
