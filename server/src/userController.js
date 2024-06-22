const db = require("../config/db");

// Get all user details
const getUserDetails = (req, res) => {
  try {
    const getQuery = "SELECT * FROM users WHERE status != ?";
    db.query(getQuery, [0], (err, results) => {
      if (err) res.status(500).send({ error: true, message: err.message });
      res.status(200).json({error: false, data: results});
    });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

// Get user details by id
const getUserById = (req, res) => {
  try {
    const userId = req.params.id
    const getQuery = "SELECT * FROM users WHERE id = ?";
    db.query(getQuery, [userId], (err, results) => {
      if (err) res.status(500).send({ error: true, message: err.message });
      res.status(200).json({error: false, data: results});
    });
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

// Add user
const addUser = (req, res) => {
  try {
    const { firstName, lastName, emailId, contactNumber, location } = req.body;
    if (firstName && lastName && emailId && contactNumber && location) {
      const insertQuery =
        "INSERT INTO users (first_name, last_name, email, contact_number, location, status, created_at) VALUES (?, ?, ?, ?, ?, 1, NOW())";
      db.query(
        insertQuery,
        [firstName, lastName, emailId, contactNumber, location],
        (err, result) => {
          if (err) res.status(500).send({ error: true, message: err.message });
          res.status(201).json({
            error: false,
            message: "User added successfully!",
          });
        }
      );
    } else {
      res.status(400).json({ error: true, message: "Please fill all the details" });
    }
  } catch (error) {
    res.status(500).send({ error: true, message: error.message });
  }
};

// Edit/ Update user
const editUser = (req, res) => {
  try {
    const { firstName, lastName, emailId, contactNumber, location } = req.body;
    const userId = req.params.id;
    const updateQuery =
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, contact_number = ?, location = ?, modified_at = NOW() WHERE id = ?";
    db.query(
      updateQuery,
      [firstName, lastName, emailId, contactNumber, location, userId],
      (err, result) => {
        if (err) res.status(500).send({ error: true, error: err.message });
        res.json({
          statusCode: 200,
          message: "User updated successfully!",
        });
      }
    );
  } catch (error) {
    res.status(500).send({ error: true, error: error.message });
  }
};

// Delete user
const deleteUser = (req, res) => {
  try {
    const userId = req.params.id;
    const deleteQuery =
      "UPDATE users SET status = ?, modified_at = NOW() WHERE id = ?";
    db.query(deleteQuery, [0, userId], (err, result) => {
      if (err) res.status(500).send({ error: true, error: err.message });
      res.json({
        statusCode: 200,
        message: "User deleted successfully!",
      });
    });
  } catch (error) {
    res.status(500).send({ error: true, error: error.message });
  }
};

module.exports = { getUserDetails, addUser, editUser, deleteUser, getUserById };
