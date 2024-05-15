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

const changeUserPassword = async (req, res) => {
  try {
    // Extract necessary data from the request parameters
    const { userid } = req.params;
    const { currentPassword, newPassword } = req.body;

    // Check if the user exists
    const user = await pool.query("SELECT * FROM users WHERE userID = ?", [
      userid,
    ]);
    if (user.length === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    // Check if the current password matches the stored password
    if (!currentPassword) {
      return res
        .status(400)
        .json({ status: "error", message: "Current password is required" });
    }

    if (!bcrypt.compareSync(currentPassword, user[0].password)) {
      return res
        .status(400)
        .json({ status: "error", message: "Current password is incorrect" });
    }

    // Hash the new password
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    // Update the password in the database
    await pool.query("UPDATE users SET password = ? WHERE userID = ?", [
      newPasswordHash,
      userid,
    ]);

    res
      .status(200)
      .json({ status: "success", message: "Password updated successfully" });
  } catch (error) {
    console.error("Error changing user password:", error.message);
    res
      .status(500)
      .json({ status: "error", message: "Failed to change password" });
  }
};

const countUser = async (req, res) => {
  try {
    // Construct the SQL query to count users with userType = 'user'
    const query = `
      SELECT COUNT(*) AS userCount
      FROM users
      WHERE userType = 'user'
    `;

    // Execute the SQL query
    const result = await pool.query(query);

    // Extract the count from the query result
    const userCount = result[0].userCount;

    // Send the user count in the response
    res.json({
      status: "success",
      data: {
        userCount: userCount,
      },
    });
  } catch (error) {
    console.error("Error counting users by userType:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to count users by userType",
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { userid } = req.params;

    // Construct the SQL query to delete the user
    const query = `
      DELETE FROM users
      WHERE userID = ?
    `;

    // Execute the SQL query with the provided userID
    const result = await pool.query(query, [userid]);

    // Check if the user with the specified ID was deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Send the success response
    res.json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete user by ID",
    });
  }
};

module.exports = {
  getUsers,
  getUserByID,
  updateUserByID,
  changeUserPassword,
  countUser,
  deleteUserById,
};
