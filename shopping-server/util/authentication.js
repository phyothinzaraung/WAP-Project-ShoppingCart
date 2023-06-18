const jwt = require('jsonwebtoken');

const {jwtSecret, expiresIn} = require('./authentication-config');

function generateToken(payload){
    return jwt.sign(payload, jwtSecret, {expiresIn});
}

// function verifyToken(token){
//     return jwt.verify(token, jwtSecret);
// }

function verifyToken(req, res, next) {
    const {authorization} = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

     try {
        jwt.verify(token, jwtSecret);
        next();
        
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
  
  }

module.exports = {
    generateToken, 
    verifyToken
};