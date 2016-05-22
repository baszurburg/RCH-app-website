var keystone = require('keystone');
//var async = require('async');
var Club = keystone.list('Club');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'clubs';

	locals.clubs = [];


	// Load the clubs
	view.on('init', function (next) {

		var q = Club.paginate({
				page: req.query.page || 1,
 				perPage: 50,
 				maxPages: 100
			})
			.sort('name');

		q.exec(function (err, results) {
			locals.clubs = results;
			next(err);
		});

	});

	// Render the view
	view.render('clubs');

};
