const express = require("express");

const authentication = require('../util/authentication');

const productController = require("../controllers/productController");

const router = express.Router();

router.get("/", authentication.verifyToken, productController.getAllProduct);

module.exports = router;