var keystone = require('keystone');
var Types = keystone.Field.Types;

var Club = new keystone.List('Club', {
    autokey: { from: 'code', path: 'key', unique: true }
});

Club.add({
    code: { type: String },
    name: { type: String },
    longitude: { type: Number },
    latitude: { type: Number },
    street: { type: String },
    city: { type: String},
    url: { type: String},
    tenue: { type: String},
    logo: { type: String },
    tel: { type: String}
});


Club.track = true;
Club.defaultColumns = 'code';
Club.register();
