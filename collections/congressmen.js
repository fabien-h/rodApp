/* **********
	The collection with all the congressmen
********** */
Congressmen = new Meteor.Collection('congressmen');

/************************
	Permissions : deny all
*********************** */
Congressmen.allow({
	update: returnFalse,
	insert: returnFalse,
	remove: returnFalse
});

Congressmen.deny({
	update: returnTrue,
	insert: returnTrue,
	remove: returnTrue
});

