const User = require("../models/user");

exports.login = (req, res, next) => {
    const user = new User(req.body.username, req.body.password).login();
    res.status(201).json(user);
};