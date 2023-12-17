const jwt = require('jsonwebtoken');
const secretKey = 'masai'; 

const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not found' });
    }

    try {

        const decoded = jwt.verify(token, secretKey);
        req.user = decoded.user; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {
    authMiddleware
}