const express = require('express');
const router = new express.Router();

const Product = require('../models/productModel');

// create the prodct
router.post('/', async (req, res) => {
    const product = new Product({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res
            .status(201)
            .send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
})

// fetch a product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id })
        if (!product) {
            res.status(404).send({ error: "Product not found" })
        }
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error)
    }
})


// fetch all products
router.get('/', async (req, res) => {
    const category = req.query.category ? { category: req.query.category } : {};
    const searchKeyword = req.query.searchKeyword
        ? {
            name: {
                $regex: req.query.searchKeyword,
                $options: 'i',
            },
        }
        : {};
    const sortOrder = req.query.sortOrder
        ? req.query.sortOrder === 'lowest'
            ? { price: 1 }
            : { price: -1 }
        : { _id: -1 };
    const products = await Product.find({ ...category, ...searchKeyword }).sort(
        sortOrder
    );
    res.send(products);
})

// update product
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'category', 'price']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates' })
    }
    try {
        const product = await Product.findOne({ _id: req.params.id })
        if (!product) {
            return res.status(404).send()
        }
        updates.forEach((update) => product[update] = req.body[update])
        await product.save()
        res.send(product)
    } catch (error) {
        res.status(400).send(error)
    }
})

// delete product
router.delete('/:id', async (req, res) => {
    try {
        const deletedProducts = await Product.findOneAndDelete({ _id: req.params.id })
        if (!deletedProducts) {
            res.status(404).send({ error: "Product not found" })
        }
        res.send(deletedProducts)
    } catch (error) {
        res.status(400).send(error)
    }
})

// review product
router.post('/:id/reviews', async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (!product)
        res.status(404).send({ message: 'Product Not Found' });

    const review = {
        name: req.body.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
        data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        message: 'Review saved successfully.',
    });
});

module.exports = router