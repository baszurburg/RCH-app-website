var keystone = require('keystone');
var async = require('async');
var Club = keystone.list('Club');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'clubs';
	locals.filters = {
		club: req.params.club
	};

	// Load the current club
	view.on('init', function (next) {

		var q = Club.model.findOne({
			key: locals.filters.club
		});

		q.exec(function (err, result) {
			locals.club = result;
			locals.page.title = result.name;
			next(err);
		});

	});

	// Load other clubs
	view.on('init', function (next) {

		var q = Club.model.find().sort('name').limit('4');

		q.exec(function (err, results) {
			locals.clubs = results;
			next(err);
		});

	});


	// Render the view
	view.render('club');

};
