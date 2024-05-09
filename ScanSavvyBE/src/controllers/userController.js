const db = require("../db/db");
const bcrypt = require("bcrypt");
const pool = require("../db/db");

const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const getUserByID = async (req, res) => {
  try {
    const { userid } = req.params;

    // Construct the SQL query
    const query = `
      SELECT firstName, lastName, email, mobile
      FROM users
      WHERE userID = ?
    `;

    // Execute the SQL query with the provided userID
    const result = await pool.query(query, [userid]);

    // Check if the user with the specified ID exists
    if (result.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Extract the relevant information from the query result
    const userInfo = result[0];

    // Send the user information in the response
    res.json({
      status: "success",
      data: userInfo,
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user by ID",
    });
  }
};

module.exports = {
  getUsers,
  getUserByID,
};
