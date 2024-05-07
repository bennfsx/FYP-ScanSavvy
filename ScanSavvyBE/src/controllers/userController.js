const db = require("../db/db");
const bcrypt = require("bcrypt");
const pool = require("../db/db");

const getUsers = async (req, res) => {
  try {
    const result = await db.query("select * from users");
    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
  }
};

const updateEventOrg = async (req, res) => {
  try {
    const { userid } = req.params; // Assuming the event organizer ID is passed as a URL parameter
    const { companyname, uennumber, phone, country, address, postalcode } =
      req.body; // Assuming these are the fields you want to update

    // Construct the SQL update query
    const query = `
      UPDATE eventorganizer 
      SET companyname = $1, uennumber = $2, phone = $3, country = $4, address = $5, postalcode = $6
      WHERE userid  = $7
    `;

    // Execute the SQL query with the provided parameters
    const result = await pool.query(query, [
      companyname,
      uennumber,
      phone,
      country,
      address,
      postalcode,
      userid,
    ]);

    // Check if any rows were affected by the update operation
    if (result.rowCount === 0) {
      // If no rows were affected, consider it a failure
      return res.status(404).json({
        status: "error",
        message: "Event organizer not found or no changes applied",
      });
    }

    // Send success response
    res.json({
      status: "success",
      message: "Event organizer updated successfully",
    });
  } catch (error) {
    console.error("Error updating event organizer:", error);
    console.error("Error updating event organizer:", error.message);

    res
      .status(500)
      .json({ status: "error", message: "Failed to update event organizer" });
  }
};

const getEventOrgById = async (req, res) => {
  try {
    const { userid } = req.params;

    // Construct the SQL query
    const query = `
      SELECT email, uennumber, companyname, phone, country, address, postalcode
      FROM eventorganizer
      WHERE userid = $1
    `;

    // Execute the SQL query with the provided eventOrganizerID
    const result = await pool.query(query, [userid]);

    // Check if the event organizer with the specified ID exists
    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Event organizer not found",
      });
    }

    // Extract the relevant information from the query result
    const eventOrganizerInfo = result.rows[0];

    // Send the event organizer information in the response
    res.json({
      status: "success",
      data: eventOrganizerInfo,
    });
  } catch (error) {
    console.error("Error fetching event organizer by ID:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch event organizer by ID",
    });
  }
};

module.exports = {
  getUsers,
  updateEventOrg,
  getEventOrgById,
};
