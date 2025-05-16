import fs from 'fs';
import path from 'path'; 
import User from '../Model/userModel.js';
import bcrypt from 'bcrypt';
import env from 'dotenv';
import jwt from 'jsonwebtoken';

env.config();

export const SendProfileData = async (req, res) => {
   try {
    const { email } = req.body;
    if (!email) return res.status(400).send("Email is required");

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const avatarBase64 = user.avatar.data.toString('base64');

    res.status(200).json({
      name: user.name,
      email: user.email,
      avatar: `data:${user.avatar.contentType};base64,${avatarBase64}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
        
}

export const SavePersonalData = async (req, res) => {
  try {
    const { name, email, email1, avatar } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    user.name = name;

    // Extract content type and base64 data from avatar string
    const matches = avatar.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).send("Invalid avatar format");
    }

    const contentType = matches[1];
    const base64Data = matches[2];

    user.avatar = {
      data: Buffer.from(base64Data, 'base64'),
      contentType
    };

    user.email = email1;

    await user.save();
    res.status(200).send("User data updated successfully");

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const ChangePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body;
        const email = req.user.email;

        const user = await User.findOne({email})
        if (!user) return res.status(404).send("User not found");
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
        const passhash = await bcrypt.hash(newPassword, 10);
        user.password = passhash;
        await user.save();
        res.status(200).send("Password changed successfully");
        } else {
        return res.status(401).send("Invalid Credentials");
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}