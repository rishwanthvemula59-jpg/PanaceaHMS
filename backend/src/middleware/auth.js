import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to protect API routes with JWT verification
 */
export function authenticateToken(req, res, next) {
  // Retrieve token from Authorization header or cookies
  const authHeader = req.headers['authorization'];
  const token = (authHeader && authHeader.split(' ')[1]) || req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: No Authorization Token Provided.'
    });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // verified payload: { id, email, role }
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Invalid or Expired Token.'
    });
  }
}

/**
 * Middleware to enforce administrator privileges
 */
export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Administrator Privileges Required.'
    });
  }
  next();
}
