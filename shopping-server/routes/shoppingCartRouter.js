const express = require("express");

const shoppingCartController = require("../controllers/shoppingCartController");

const router = express.Router();

router.get("/:userId", shoppingCartController.getShoppingCart);

module.exports = router;