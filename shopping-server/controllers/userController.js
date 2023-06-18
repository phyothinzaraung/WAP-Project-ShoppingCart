const authentication = require('../util/authentication');

const User = require("../models/user");

exports.login = (req, res, next) => {
    const user = new User(req.body.username, req.body.password).login();
    const token = authentication.generateToken(user);
    const response = {
        id: user.id,
        username: user.username,
        accessToken: token
    }
    res.status(201).json(response);
};