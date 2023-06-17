const express = require("express");

const shoppingCartController = require("../controllers/shoppingCartController");

const router = express.Router();

router.get("/:userId", shoppingCartController.getShoppingCart);
router.post("/add", shoppingCartController.addToCart);
router.delete("/remove", shoppingCartController.removeFromCart);

module.exports = router;