import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.SECRET
export default function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
 
   if (!token) return res.status(401).send('Access Denied');
 
   try {
     const decoded = jwt.verify(token, process.env.SECRET_KEY);
     req.user = decoded;
 
     res.status(200).json({ message: 'Token is valid', user: decoded });
   } catch (err) {
     console.error('JWT verification error:', err.message);
     res.status(403).send('Invalid Token');
   }
}
