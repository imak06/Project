import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const protectAdmin = async (req, res, next) => {
  let token = null;

  // Check Authorization header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.adminToken) {
    // Check HTTP-only cookie if available
    token = req.cookies.adminToken;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this resource. Please log in as admin.'
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'super_secure_portfolio_jwt_secret_key_2026_arik_maitra';
    const decoded = jwt.verify(token, secret);

    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin account not found or has been revoked.'
      });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token. Please log in again.'
    });
  }
};
