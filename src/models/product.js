const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  perGiven: {
    type: String,
    required: true
  },
  images: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  Address: {
    type: String
  }

},{timestamps: true})

module.exports =  mongoose.model('Products',productSchema);

