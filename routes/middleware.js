var _ = require('lodash');
var querystring = require('querystring');
var keystone = require('keystone');

exports.initLocals = function(req, res, next) {

	var locals = res.locals;

	locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Nieuws', key: 'blog', href: '/blog' },
		{ label: 'Teams', key: 'teams', href: '/teams' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery' },
		{ label: 'Contact', key: 'contact', href: '/contact' }
	];

	locals.user = req.user;

	locals.basedir = keystone.get('basedir');

	locals.page = {
		title: 'RCH mobiel',
		path: req.url.split("?")[0] // strip the query - handy for redirecting back to the page
	};

	//locals.qs_set = qs_set(req, res);

	if (req.cookies.target && req.cookies.target == locals.page.path) res.clearCookie('target');

	//var bowser = require('../lib/node-bowser').detect(req);
    //
	//locals.system = {
	//	mobile: bowser.mobile,
	//	ios: bowser.ios,
	//	iphone: bowser.iphone,
	//	ipad: bowser.ipad,
	//	android: bowser.android
	//};

	next();

};


exports.theme = function (req, res, next) {
	if (req.query.theme) {
		req.session.theme = req.query.theme;
	}
	res.locals.themes = [
		'Bootstrap',
		'Cerulean',
		'Cosmo',
		'Cyborg',
		'Darkly',
		'Flatly',
		'Journal',
		'Lumen',
		'Paper',
		'Readable',
		'rch',
		'Sandstone',
		'Simplex',
		'Slate',
		'Spacelab',
		'Superhero',
		'United',
		'Yeti'
	];
	res.locals.currentTheme = req.session.theme || 'rch';
	next();
};

exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	res.locals.messages = _.any(flashMessages, function (msgs) { return msgs.length }) ? flashMessages : false;
	next();
};
