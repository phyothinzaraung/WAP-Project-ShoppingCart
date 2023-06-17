const express = require("express");

const productRouter = require("./routes/productRouter");

const app = express();

app.use(express.json());

app.use("/api/products", productRouter);

app.listen(3000, ()=>{
    console.log("Listening on 3000...");
})