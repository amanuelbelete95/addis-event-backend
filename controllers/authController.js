import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';


const createUser = async (userName, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
        'INSERT INTO users (userName, password, role) VALUES ($1, $2, $3) RETURNING *',
        [userName, hashedPassword, role]
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

        const user = await pool.query('SELECT * FROM users WHERE userName = $1', [userName]);
        if (user.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Register the new User
        const newUser = await createUser(userName, password, role);
        res.status(201).json({ message: `User with ${newUser.userName} created successfully`, user: newUser });
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
             WHERE userName = $1
            `, [userName])
        if (user.rows.length === 0) {
            return res.status(404).json({ message: `The user doesn't exist` })
        }
        const isMatch = await bcrypt.compare(password, user.rows[0].password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credential" })
        }

        const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, process.env.JWT_SECRET, { expiresIn: "1h" })
        return res.status(200).json({ token })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
