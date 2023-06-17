const express = require("express");

const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/login", userRouter);

app.use((req, res, next) => {
    res.status(404).send("Api is not supported");
})

app.use((err, req, res, next)=>{
    res.status(500).send(err.message);
})

app.listen(3000, ()=>{
    console.log("Listening on 3000...");
})