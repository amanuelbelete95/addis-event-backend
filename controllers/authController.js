import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

const createUser = async (name, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
    );
    return newUser.rows[0];
};

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Please the provide the fields to register the user',
            });
        }

        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Register the new User
        const newUser = await createUser(name, email, password);
        const token = generateToken(newUser.id);
        res.cookie('token', token, cookiesOptions);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email && !password) {
            return res.status(400).json({ message: `${email} & ${password} are required to login` })
        }
        const userExists = await pool.query(
            `SELECT * FROM users
            WHERE email = $1
            `, [email])
        if (userExists.rows[0] === 0) {
            return res.status(404).json({ message: `The user email doesn't exist` })
        }
        // const isMatch = await bcrypt.compare(password, userExists.password)

        return res.status(201).json({ message: `Welcome back, ${userName}` })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
