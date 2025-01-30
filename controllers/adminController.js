const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
};
// Reset Password functionality with token
const resetPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        // Get token from headers
        const token = req.header('Authorization').replace('Bearer ', '');

        // Verify the token and extract userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the admin by userId from the token
        const admin = await Admin.findById(decoded.userId);
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        // Compare the old password with the stored password
        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the admin's password with the new hashed password
        admin.password = hashedPassword;
        await admin.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error resetting password' });
    }
};


module.exports = { login, resetPassword }