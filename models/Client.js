var mongoose = require('mongoose');
var ClientSchema = new mongoose.Schema({
  numClient: String,
  nom: String,
  prenom: String,
});
module.exports = mongoose.model('Client', ClientSchema);
