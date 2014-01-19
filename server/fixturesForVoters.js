/* **********
	Adds basic datas for the voters base
********** */
if ( Voters.find().count() === 0 ) {

	Voters.insert({
		totalVoters: 2,
		republicanVoters: 1,
		democratVoters: 1
	});

};
