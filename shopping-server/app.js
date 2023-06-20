const express = require("express");
const bodyParser = require('body-parser');

const router = require('./routes');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTION");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Request-With");
    next();
});
app.use('/api', router);
app.use("/images", express.static('images'));

app.use((req, res, next) => {
    res.status(404).send("Api is not supported");
});
app.use((err, req, res, next) => {
    res.status(500).json({
        status: err.status,
        message: err.message
    });
});

app.listen(3000, () => {
    console.log("Listening on 3000...");
});