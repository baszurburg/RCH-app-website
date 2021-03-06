var keystone = require('keystone');
var async = require('async');
var Team = keystone.list('Team');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'teams';

	locals.teams = [];


	// Load the teams
	view.on('init', function (next) {

		var q = Team.paginate({
				page: req.query.page || 1,
 				perPage: 10,
 				maxPages: 10
			})
	//		.where('state', 'published')
			.sort('order')
			.populate('trainers leiders');

		if (locals.category) {
			q.where('categories').in([locals.category]);
		}

		q.exec(function (err, results) {
			locals.teams = results;
			next(err);
		});

	});

	// Render the view
	view.render('teams');

};
