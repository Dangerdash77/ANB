// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Example: { username: 'manav', role: 'owner' }
    next(); // move to the next handler
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
