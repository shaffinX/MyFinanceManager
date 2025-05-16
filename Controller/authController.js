import fs from 'fs';
import path from 'path'; 
import User from '../Model/userModel.js';
import bcrypt from 'bcrypt';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
env.config();

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;        
        // Use findOne to fetch a single user
        const user = await User.findOne({ email });

        if (user) {
            let isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign(
                    { email: user.email},
                    process.env.SECRET_KEY,
                    { expiresIn: '1d' }
                );
                return res.status(200).json({ token });
            } else {
                return res.status(401).send("Invalid Credentials");
            }
        } else {
            return res.status(401).send("Invalid Credentials");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send('User with this email already exists');
    }

    // 2. Hash password
    const passhash = await bcrypt.hash(password, 10);

    // 3. Read image
    const filePath = path.join(process.cwd(), 'user.png'); // ensures absolute path
    const imageData = fs.readFileSync(filePath);
    const contentType = 'image/png';

    // 4. Create and save user
    const newUser = new User({
      name,
      email,
      password: passhash,
      avatar: {
        data: imageData,
        contentType: contentType
      }
    });

    await newUser.save();
    return res.status(200).send('Registered Successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

export const checkMe = async (req, res) => {
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
};