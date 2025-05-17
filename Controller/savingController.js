import fs from 'fs';
import path from 'path'; 
import Saving from '../Model/savingModel.js';
import bcrypt from 'bcrypt';
import env from 'dotenv';
import jwt from 'jsonwebtoken';
env.config();

export const addSavings = async (req, res) => {
    try {
        const {email, savings, month} = req.body;
        const result = await Saving.findOneAndUpdate(
            { email, month },
            { savings }, // update only the savings field
            { new: true, upsert: true } // create if not exists
        );
        res.status(200).json(result);
    }
    catch (err) {
        console.error("Error adding savings:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getSavings = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await Saving.find({ email });
        res.status(200).json(result);
    }
    catch (err) {
        console.error("Error fetching savings:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}