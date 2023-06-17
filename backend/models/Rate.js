const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rateSchema = new Schema({
  rate: {
    type: Number,
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['2W', '4W'],
    required: true
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  location:{
    type:Schema.Types.ObjectId,
    ref:'location',
    required:true
  }
});

module.exports = mongoose.models.Rate||mongoose.model('Rate', rateSchema);
