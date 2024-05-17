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
    const { siteID } = req.body;

    // Check if the user already has the site in favorites
    const existingFavorite = await pool.query(
      "SELECT * FROM favorites WHERE userID = ? AND siteID = ?",
      [userID, siteID]
    );

    if (existingFavorite.length > 0) {
      return res.status(400).json({ error: "Site already in favorites" });
    }

    // Insert the new favorite into the favorites table
    await pool.query("INSERT INTO favorites (userID, siteID) VALUES (?, ?)", [
      userID,
      siteID,
    ]);

    res.status(201).json({ message: "Site added to favorites successfully" });
  } catch (error) {
    console.error("Error adding site to favorites:", error);
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
