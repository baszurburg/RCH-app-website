var keystone = require('keystone');
var User = keystone.list('User');

module.exports = function (done) {
	new User.model({
		name: {
			first: 'Bas',
			last: 'Zurburg'
		},
		email: 'bas.zurburg@xs4all.nl',
		password: 'delicionu',
		isAdmin: true,
		isProtected: false
	})
		.save(done);
};
