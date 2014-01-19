//to check that the current user is the owner of the information
ownsDocument = function(userId, doc) {
	return doc && doc._id === userId;
};

notOwnsDocument = function(userId, doc) {
	return doc && doc._id != userId;
};

//return false
returnFalse = function() {
	return false;
};

//return true
returnTrue = function() {
	return true;
};
