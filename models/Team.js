var keystone = require('keystone');
var Types = keystone.Field.Types;

var Team = new keystone.List('Team', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Team.add({
	name: { type: String, required: true },
	trainers: { type: Types.Relationship, ref: 'User', many: true },
	leiders: { type: Types.Relationship, ref: 'User', many: true },
	klasse: { type: String },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	},
	spelers: { type: Types.Html, wysiwyg: true, height: 150 },
	sponsors: { type: Types.Html, wysiwyg: true, height: 150 },
	url: { type: String },
	uitslagenUrl: { type: String },
	tag: { type: String },
	order: { type: Types.Number }
});


Team.track = true;
Team.defaultColumns = 'name';
Team.register();
