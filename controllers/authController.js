import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

const createUser = async (userName, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
        'INSERT INTO users (userName password) VALUES ($1, $2, $3) RETURNING *',
        [userName, hashedPassword]
    );
    return newUser.rows[0];
};

export const registerUser = async (req, res) => {
    try {
        const { userName, role, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({
                message: 'Please the provide the fields to register the user',
            });
        }

        const user = await pool.query('SELECT * FROM users WHER= $1',);
        if (user.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Register the new User
        const newUser = await createUser(userName, password);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logInUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: `Provide the credential to procedd` })
        }
        const user = await pool.query(
            `SELECT * FROM users
             WHER# = $1
            `, [userName])
        if (user.rows[0] === 0) {
            return res.status(404).json({ message: `The user doesn't exist` })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({ message: "InValid credential" })
        }

        const token = generateToken(user.id)

        return res.status(201).json({ message: `Welcome back, ${userName}` })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
