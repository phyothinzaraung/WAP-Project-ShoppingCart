const express = require("express");
const cors = require('cors');
const path = require('path');

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const shoppingCartRouter = require("./routes/shoppingCartRouter");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", productRouter);
app.use("/api/login", userRouter);
app.use("/api/shopping-carts", shoppingCartRouter);
app.use("/images/:imagename", (req, res, next) => {
    res.sendFile(path.join(__dirname, "images", req.params.imagename));
});

app.use((req, res, next) => {
    res.status(404).send("Api is not supported");
})

app.use((err, req, res, next)=>{
    res.status(500).send(err.message);
})

app.listen(3000, ()=>{
    console.log("Listening on 3000...");
})