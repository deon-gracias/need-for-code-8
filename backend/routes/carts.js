const express = require("express");
// const Cart = require("../models/cart");
const Cart = require("../models/cartModel")
const User = require("../models/userModel")

const Product = require("../models/productModel");
// const isAuth = require("../middleware/auth");
const {isAuth} = require("../lib/auth");
const router = new express.Router();

//get cart product

router.get("/", isAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  try {
    const cart = await Cart.findOne({ user: user._id });
    if (cart && cart.product.length > 0) {
      res.status(200).send(cart);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    res.status(500).send();
  }
});

//add cart
router.post("/", isAuth, async (req, res) => {
  const user = await User.findOne({email: req.user.email});


  console.log(user)
  const { itemId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user });
    const item = await Product.findOne({ _id: itemId });

    if (!item) {
      res.status(404).send({ message: "item not found" });
      return;
    }
    const price = item.price;
    const name = item.name;
    //If cart already exists for user,
    if (cart) {
      const itemIndex = cart.product.findIndex((item) => item.itemId == itemId);
      //check if product exists or not

      if (itemIndex > -1) {
        let product = cart.product[itemIndex];
        product.quantity += quantity;

        cart.total = cart.product.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
        },0)
        
        cart.product[itemIndex] = product;
        await cart.save();
        res.status(200).send(cart);
      } else {
        cart.product.push({ itemId, name, quantity, price });
        cart.total = cart.product.reduce((acc, curr) => {
            return acc + curr.quantity * curr.price;
        },0)

        await cart.save();
        res.status(200).send(cart);
      }
    } else {
      //no cart exists, create one
      console.log("at the correct positio");
      console.log(user)
      const newCart = await Cart.create({
        user,
        product: [{ itemId, name, quantity, price }],
        total: quantity * price,
      });
    //   console.log(product);
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("something went wrong");
  }
});

//delete item in cart

router.delete("/", isAuth, async (req, res) => {
//   const user = req.user._id;
 const user = await User.findOne({ email: req.user.email });
 const itemId = req.query.itemId;
  try {
    let cart = await Cart.findOne({  user: user._id });
    console.log(cart)
    const itemIndex = cart.product.findIndex((item) => item.itemId == itemId);
    console.log(itemIndex);
    if (itemIndex > -1) {
      let item = cart.product[itemIndex];
      cart.total -= item.quantity * item.price;
      if(cart.total < 0) {
          cart.total = 0
      } 
      
      cart.product.splice(itemIndex, 1);
      cart.total = cart.product.reduce((acc, curr) => {
        return acc + curr.quantity * curr.price;
    },0)
      cart = await cart.save();

      res.status(200).send(cart);
    } else {
    res.status(404).send("item not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});



module.exports = router;