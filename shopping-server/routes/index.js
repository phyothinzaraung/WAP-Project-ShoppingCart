const express = require('express');

const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const shoppingCartRouter = require("./shoppingCartRouter");

const router = express.Router();


router.use("/products", productRouter);
router.use("/login", userRouter);
router.use("/shopping-carts", shoppingCartRouter);

module.exports = router;