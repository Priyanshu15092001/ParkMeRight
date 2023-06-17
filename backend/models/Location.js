const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  slots2W: {
    type: Number,

  },

  slots4W: {
    type: Number,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin' 
    
  }
});

module.exports = mongoose.models.Location||mongoose.model('Location', locationSchema);
