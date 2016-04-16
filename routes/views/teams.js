var keystone = require('keystone');
var async = require('async');
var Team = keystone.list('Team');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'teams';

	locals.teams = [];

	// Load all categories
	//view.on('init', function (next) {
    //
	//	PostCategory.model.find().sort('name').exec(function (err, results) {
    //
	//		if (err || !results.length) {
	//			return next(err);
	//		}
    //
	//		locals.categories = results;
    //
	//		// Load the counts for each category
	//		async.each(locals.categories, function (category, next) {
    //
	//			keystone.list('Post').model.count().where('state', 'published').where('categories').in([category.id]).exec(function (err, count) {
	//				category.postCount = count;
	//				next(err);
	//			});
    //
	//		}, function (err) {
	//			next(err);
	//		});
    //
	//	});
    //
	//});

	// Load the current category filter
	//view.on('init', function (next) {
	//	if (req.params.category) {
	//		PostCategory.model.findOne({ key: locals.filters.category }).exec(function (err, result) {
	//			locals.category = result;
	//			next(err);
	//		});
	//	} else {
	//		next();
	//	}
	//});

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
