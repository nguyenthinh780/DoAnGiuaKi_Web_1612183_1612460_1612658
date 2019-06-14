var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;


var AccountSchema = new Schema(
  {
    login_name: {type: String, required: true, min: 5, max: 20},
    password: {type: String, required: true, min: 6, max: 20},
    name:  {type: String, max: 50},
    birth:  {type: Date},
    email:  {type: String, max: 50},
    phone:  {type: String, max: 15},
    type: {type: String, required: true, enum: ['Guest', 'Customer', 'Admin'], default: 'Guest'}
  }
);

// Virtual for account's URL
AccountSchema
.virtual('url')
.get(function () {
  return '/api/account/' + this._id;
});


AccountSchema
.virtual('birth_formatted')
.get(function () {
  return moment(this.birth).format('MMMM Do, YYYY');
});

//Export model
module.exports = mongoose.model('Account', AccountSchema);
