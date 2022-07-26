const express = require('express')
const router = express.Router()

const Product = require('../models/productModel')

router.get("/", async (req, res, next) => {
    const categories = await Product.aggregate([
        {
            $group: {
                _id: null,
                category: {
                    $addToSet: "$category"
                }
            }
        }
    ]);

    return res.status(200).send(categories[0].category)
})

router.get("/:name", async (req, res, next) => {
    const products = await Product.find({ category: req.params.name })

    if (!products)
        return res.status(404).send("No products found in category")

    return res.status(200).send(products)
})

module.exports = router