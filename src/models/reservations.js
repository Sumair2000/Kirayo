const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  productId : {
    type: Schema.Types.ObjectId,
    ref: 'Products'
  },
  isReserved: {
    type: Boolean
  }
},{timestamps: true})

module.exports = mongoose.model('Reservations',reservationSchema);