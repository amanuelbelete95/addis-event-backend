import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import pool from '../db.js';

const router = express.Router();

const createUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
    );
    return newUser.rows[0];
};

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please the provide the fields to register the user',
            });
        }
        const newUser = await createUser(name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// router.post('/login', loginUser);

export default router;