const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity cannot be negative'],
    default: 0
  },
  status: {
    type: String,
    enum: ['In Stock', 'Out of Stock'],
    default: 'In Stock'
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to automatically update status based on quantity
productSchema.pre('save', function(next) {
  this.status = this.quantity > 0 ? 'In Stock' : 'Out of Stock';
  next();
});

// Middleware to update status on findOneAndUpdate
productSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.quantity !== undefined) {
    update.status = update.quantity > 0 ? 'In Stock' : 'Out of Stock';
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
