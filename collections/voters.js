/* **********
	The collection with the voters
********** */
Voters = new Meteor.Collection('voters');

/************************
	Permissions : deny all
*********************** */
Voters.allow({
	update: returnFalse,
	insert: returnFalse,
	remove: returnFalse
});

Voters.deny({
	update: returnTrue,
	insert: returnTrue,
	remove: returnTrue
});

