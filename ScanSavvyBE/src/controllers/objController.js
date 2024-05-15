const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db/db"); // Import your MySQL connection pool

const createFavourites = async (req, res) => {
  try {
  } catch (error) {}
};

const getVendor = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM sites");
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const createVendor = async (req, res) => {
  try {
    const { siteName, siteURL, email, phone } = req.body; // Assuming these fields are sent in the request body

    // Validate if required fields are present
    if (!siteName || !siteURL || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Assuming you have a SQL query to insert a new vendor into the database
    const query = `
            INSERT INTO sites (siteName, siteURL, email, phone)
            VALUES (?, ?, ?, ?)
        `;

    // Execute the query with the provided parameters
    await pool.query(query, [siteName, siteURL, email, phone]);

    // Respond with success
    res.status(201).json({ message: "Vendor created successfully" });
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createFavourites, createVendor, getVendor };
