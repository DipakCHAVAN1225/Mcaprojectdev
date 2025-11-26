import jwt from 'jsonwebtoken';
import config from "../config/config.js";

/**
 * Generates jwt token for a userSelect
 * @param {Object} payload - The data to encode in the token (usually user Id and other info)
 * @param {string} expiresIn - Token expiration time (e.g., '1h', '7d')
 * @return {string} - The generated JWT token
 */

export const generateToken = (payload, expiresIn = config.jwtExpiresIn) => {
  try {
    const token = jwt.sign(payload, config.jwtSecret, { 
      expiresIn: expiresIn,
      issuer: config.jwtIssuer,
      audience: config.jwtAudience,

    });
    return token;
  } catch (error) {
    throw new Error(`Error generating token: '  ${error.message}`);
  }
};

/**
 * Verifies a jwt token
 * @param {string} token - The JWT token to verify
 * @return {Object} - The decoded token payload
 */

 export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      throw new Error(`Error verifying token: ${error.message}`);
    }
  }
};

/**
 * Decodes a jwt token without verifying (use with caution)
 * @param {string} token - The JWT token to decode
 * @return {Object} - The decoded token payload
 * */
  
export const authenticateToken = (req, res, next) => {
    try{
      // Get token from headers
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
      if (!token) {
        return res.status(401).json({ message: 'access token required' });
    }
      // Verify token
      const decoded = verifyToken(token);
      req.user = decoded; // Attach decoded payload to request object
      next();
    }catch(error){
      return res.status(401).json({ message: error.message });
    }
};