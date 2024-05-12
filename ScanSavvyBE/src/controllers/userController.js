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

const updateUserByID = async (req, res) => {
  try {
    const { userid } = req.params;
    const { firstName, lastName, email, mobile } = req.body;

    const updateFields = [];
    const queryParams = [];

    // Iterate over the fields in the request body
    for (const [key, value] of Object.entries(req.body)) {
      // Skip fields that are undefined or userID
      if (value === undefined || key === "userID") {
        continue;
      }

      // Add field to the updateFields array
      updateFields.push(`${key} = ?`);

      // Add corresponding value to the queryParams array
      queryParams.push(value);
    }

    // Construct the SQL query
    let query =
      "UPDATE users SET " + updateFields.join(", ") + " WHERE userID = ?";
    queryParams.push(userid);

    // Execute the SQL query with the provided userID and user information
    await pool.query(query, queryParams);

    // Send success response
    res.json({
      status: "success",
      message: "User information updated successfully",
    });
  } catch (error) {
    // Check if error is due to email uniqueness constraint violation
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }

    console.error("Error updating user by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user information",
    });
  }
};

module.exports = {
  getUsers,
  getUserByID,
  updateUserByID,
};
