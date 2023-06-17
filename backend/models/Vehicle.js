const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  registrationNo: {
    type: String,
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
  customer:{
    type:Schema.Types.ObjectId,
    ref:'Customer',
    required:true
  }
});

module.exports = mongoose.models.Vehicle||mongoose.model('Vehicle', vehicleSchema);
