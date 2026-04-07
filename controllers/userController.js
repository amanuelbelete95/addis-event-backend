
import pool from '../db.js';
export const getallUsers = async (req, res) => {
  try {
    const allUsers = await pool.query(`select * from users`);
    if (allUsers.rows.length === 0) {
      return res.status(404).json({
        message: 'No users found.',
        code: 404,
      });
    }
    res.json(allUsers.rows);
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      message: 'Internal Server Error: An unexpected error occurred.',
      code: 500,
    });
  }
};


// Admin can see the user detail
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });

  }
}


// Incase admin want to update a user role;
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, role } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User Id is required" });
    }

    // Check if user exists
    const userExist = await pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );

    if (userExist.rows.length === 0) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    // Update only provided fields
    const updatedUser = await pool.query(
      `UPDATE users SET
        firstname = COALESCE($1, firstname),
        lastname = COALESCE($2, lastname),
        role = COALESCE($3, role)
       WHERE id = $4
       RETURNING id, firstname, lastname, username, role`,
      [firstname || null, lastname || null, role || null, id]
    );

    res.status(200).json(updatedUser.rows[0]);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: 'Internal Server Error: An unexpected error occurred.',
      code: 500,
    });
  }
};