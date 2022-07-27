// const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')
// const ObjectID = mongoose.Schema.Types.ObjectId

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  product: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: Number
  }],
  total: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
})

const Cart = model('cart', cartSchema);
module.exports = Cart;

