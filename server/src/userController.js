const db = require("../config/db");

// Get all user details
const getUserDetails = (req, res) => {
  try {
    const getQuery = "SELECT * FROM users WHERE status != ?";
    db.query(getQuery, [0], (err, results) => {
      if (err) res.status(500).send(err);
      res.json(results);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add user
const addUser = (req, res) => {
  try {
    const { firstName, lastName, emailId, contactNumber, location } = req.body;
    const insertQuery =
      "INSERT INTO users (first_name, last_name, email, contact_number, location, status, created_at) VALUES (?, ?, ?, ?, ?, 1, NOW())";
    db.query(
      insertQuery,
      [firstName, lastName, emailId, contactNumber, location],
      (err, result) => {
        if (err) res.status(500).send(err);
        res.json({ statusCode: 201, message: "User added successfully!" });
      }
    );
  } catch (error) {
    res.status(500).send(error);
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
        if (err) res.status(500).send(err);
        res.json({
          statusCode: 200,
          message: "User updated successfully!",
        });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete user
const deleteUser = (req, res) => {
  try {
    const userId = req.params.id;
    const deleteQuery = "UPDATE users SET status = ?, modified_at = NOW() WHERE id = ?";
    db.query(deleteQuery, [0, userId], (err, result) => {
      if (err) res.status(500).send(err);
      res.json({
        statusCode: 200,
        message: "User deleted successfully!",
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getUserDetails, addUser, editUser, deleteUser };
