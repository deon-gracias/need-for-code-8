const { Schema, model } = require('mongoose')
// var ObjectId = require('mongodb').ObjectID;

const reviewSchema = new Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, default: 0 },
        comment: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const productSchema = new Schema(
    {
        id: { type: String, unique: true, required: true },
        name: { type: String, required: true },
        image: { type: String },
        brand: { type: String, required: true },
        price: { type: Number, default: 0, required: true },
        category: { type: String, required: true },
        countInStock: { type: Number, default: 0, required: true },
        description: { type: String },
        rating: { type: Number, default: 0, required: true },
        numReviews: { type: Number, default: 0, required: true },
        reviews: [reviewSchema],
    },
    { timestamps: true }
)

const Product = model('Product', productSchema);

module.exports = Product;