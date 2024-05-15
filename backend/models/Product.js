const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['all', 'mens', 'kids', 'women'],
    default: 'all',
    required: true
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
  source: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Product', productSchema);
