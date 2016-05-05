const keystone = require('keystone');
const middleware = require('./middleware');
const importRoutes = keystone.importer(__dirname);

var restful = require('restful-keystone')(keystone);

keystone.pre('routes', middleware.initLocals);

keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.flashMessages);

keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404');
});

// Load Routes
var routes = {
	download: importRoutes('./download'),
	views: importRoutes('./views')
};

exports = module.exports = function (app) {

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.get('/teams', routes.views.teams);
	app.all('/teams/team/:team', routes.views.team);
	app.get('/clubs', routes.views.clubs);
	app.all('/clubs/club/:club', routes.views.club);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);

	// Downloads
	app.get('/download/users', routes.download.users);

	//Explicitly define which lists we want exposed
	restful.expose({
		Post : {
			methods: ["list", "retrieve", "update", "create"]
		},
		Club : {
			methods: ["list", "retrieve", "update", "create"]
		},
		Team : {
			methods: ["list", "retrieve"]
		},
		User : {
			show : ["_id", "email", "phone", "photo", "name"],
			methods: ["list", "retrieve"]
		}
	}).start();

};
