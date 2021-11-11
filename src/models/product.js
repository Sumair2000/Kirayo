const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  userName: {
    type: String,
    required: true
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
  rentType: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    default: []
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  }

},{timestamps: true})

module.exports =  mongoose.model('Products',productSchema);

