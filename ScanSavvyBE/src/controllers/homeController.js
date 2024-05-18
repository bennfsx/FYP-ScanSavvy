const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db/db"); // Import your MySQL connection pool

const userHistory = async (req, res) => {
  try {
    const { userID, siteID } = req.body;
    // Insert a new record into the history table
    const result = await pool.query(
      "INSERT INTO history (userID, siteID) VALUES (?, ?)",
      [userID, siteID]
    );

    res
      .status(200)
      .json({ success: true, message: "Site visit recorded successfully." });
  } catch (error) {
    console.error("Error recording site visit:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to record site visit." });
  }
};

const createUserFavorites = async (req, res) => {
  try {
    const { userID } = req.params;
    const { siteIDs } = req.body; // Expecting an array of siteIDs

    // Begin a transaction
    await pool.query("START TRANSACTION");

    // Delete existing favorites for the user
    await pool.query("DELETE FROM favorites WHERE userID = ?", [userID]);

    // Insert new favorites
    const insertPromises = siteIDs.map((siteID) =>
      pool.query("INSERT INTO favorites (userID, siteID) VALUES (?, ?)", [
        userID,
        siteID,
      ])
    );

    await Promise.all(insertPromises);

    // Commit the transaction
    await pool.query("COMMIT");

    res.status(201).json({ message: "Favorites updated successfully" });
  } catch (error) {
    // Rollback transaction in case of error
    await pool.query("ROLLBACK");
    console.error("Error updating favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserFavoritesByUserID = async (req, res) => {
  try {
    const { userID } = req.params;
    const favorites = await pool.query(
      "SELECT s.siteID, s.siteName, s.siteDesc, s.siteURL, s.email, s.phone, s.status, s.logo FROM favorites f JOIN sites s ON f.siteID = s.siteID WHERE f.userID = ?",
      [userID]
    );
    res.json({ favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { userHistory, createUserFavorites, getUserFavoritesByUserID };
