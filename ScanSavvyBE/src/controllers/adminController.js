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

const countVendor = async (req, res) => {
  try {
    const query = `
      SELECT COUNT(*) AS vendorCount
      FROM sites
      WHERE status = 'active'
    `;

    // Execute the SQL query
    const result = await pool.query(query);

    // Extract the count from the query result
    const vendorCount = result[0].vendorCount;

    // Send the user count in the response
    res.json({
      status: "success",
      data: {
        vendorCount: vendorCount,
      },
    });
  } catch (error) {
    console.error("Error counting vendor by status:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to count vendor by status",
    });
  }
};

const createVendor = async (req, res) => {
  try {
    const { siteName, siteURL, email, phone } = req.body; // Assuming these fields are sent in the request body
    const { status } = "active";
    // Validate if required fields are present
    if (!siteName || !siteURL || !email || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Assuming you have a SQL query to insert a new vendor into the database
    const query = `
            INSERT INTO sites (siteName, siteURL, email, phone, status, logo)
            VALUES (?, ?, ?, ?, 'active', 'https://storage.googleapis.com/eventstack_bucket/scansavvyTrans.png')
        `;

    // Execute the query with the provided parameters
    await pool.query(query, [siteName, siteURL, email, phone, status]);

    // Respond with success
    res.status(201).json({ message: "Vendor created successfully" });
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateVendorByID = async (req, res) => {
  try {
    const { siteID } = req.params;
    const { siteName, email, siteURL, phone, status } = req.body;

    const updateFields = [];
    const queryParams = [];

    // Iterate over the fields in the request body
    for (const [key, value] of Object.entries(req.body)) {
      // Skip fields that are undefined or siteID
      if (value === undefined || key === "siteID") {
        continue;
      }

      // Add field to the updateFields array
      updateFields.push(`${key} = ?`);

      // Add corresponding value to the queryParams array
      queryParams.push(value);
    }

    // Construct the SQL query
    let query =
      "UPDATE sites SET " + updateFields.join(", ") + " WHERE siteID = ?";
    queryParams.push(siteID);

    // Execute the SQL query with the provided siteID and vendor information
    await pool.query(query, queryParams);

    // Send success response
    res.json({
      status: "success",
      message: "Vendor information updated successfully",
    });
  } catch (error) {
    // Check if error is due to email uniqueness constraint violation
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }

    console.error("Error updating vendor by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to update user information",
    });
  }
};

const deleteVendorByID = async (req, res) => {
  try {
    const { siteID } = req.params;

    // Construct the SQL query to delete the user
    const query = `
      DELETE FROM sites 
      WHERE siteID = ?
    `;

    // Execute the SQL query with the provided vendorID
    const result = await pool.query(query, [siteID]);

    // Check if the vendor with the specified ID was deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Vendor not found",
      });
    }

    // Send the success response
    res.json({
      status: "success",
      message: "Vendor deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting vendor by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to delete vendor by ID",
    });
  }
};

module.exports = {
  createFavourites,
  createVendor,
  getVendor,
  updateVendorByID,
  deleteVendorByID,
  countVendor,
};
