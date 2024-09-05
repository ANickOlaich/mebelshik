const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  
  if (!token) {
    req.isAuthenticated = false;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    req.isAuthenticated = true;
    next();
  } catch (err) {
    req.isAuthenticated = false;
    next();
  }
}


module.exports = authMiddleware;
