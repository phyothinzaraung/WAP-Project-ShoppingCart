const express = require("express");

const authentication = require("../util/authentication");
const shoppingCartController = require("../controllers/shoppingCartController");

const router = express.Router();

router.get("/:userId",authentication.verifyToken, shoppingCartController.getShoppingCart);
router.post("/add", authentication.verifyToken, shoppingCartController.addToCart);
router.delete("/remove", authentication.verifyToken, shoppingCartController.removeFromCart);
router.put("/update", authentication.verifyToken, shoppingCartController.updateShoppingCart);
router.put("/placeOrder", authentication.verifyToken, shoppingCartController.placeOrder);

module.exports = router;