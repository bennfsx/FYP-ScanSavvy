const { Storage } = require("@google-cloud/storage");
const pool = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const { decode } = require("base64-arraybuffer");
require("dotenv").config();

const uploadToGCP = async (dataBuffer, filename, contentType) => {
  try {
    const storage = new Storage();
    const bucket = storage.bucket(process.env.BUCKET_NAME);

    const file = bucket.file(filename);
    await file.save(dataBuffer, {
      contentType: contentType || "application/octet-stream", // Default to octet-stream if contentType is not provided
      resumable: false,
    });

    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    });

    return url;
  } catch (error) {
    console.error("Error uploading file to Google Cloud Storage:", error);
    throw error;
  }
};

const uploadAsset = async (req, res) => {
  try {
    const fileSuffix = req.file.originalname.split(".").pop();
    const fileName = req.file.filename + "." + fileSuffix;
    console.log("here is the desc element: ", req.file);
    const defaultDescription = "Default Image Description";
    const result = await uploadToGCP(req.file.buffer, fileName); // Use req.file.buffer instead of req.file.path
    if (result) {
      // Compose the full URL
      const imageURL = process.env.IMAGE_BASE_URI + fileName;

      // Assuming you have a PostgreSQL client setup, insert the imageURL into your database
      const queryString = `
        INSERT INTO Event (EventID, ImageURL, EventDescription) 
        VALUES ($1, $2, $3)
        WHERE EventID = $1;
      `;
      const values = [req.params.eventid, imageURL, defaultDescription];

      // Execute the SQL query
      await pool.query(queryString, values);

      // Return the URL path for the caller
      return res.status(200).json({
        status: "ok",
        msg: "file upload successful",
        fileURL: imageURL,
      });
    } else {
      return res
        .status(400)
        .json({ status: "error", msg: "file upload failed" });
    }
  } catch (err) {
    console.error("Error: ", err);
    return res
      .status(400)
      .json({ status: "error", msg: "file upload failed with error" });
  }
};

const createEvent = async (req, res) => {
  try {
    // Assuming the image data is sent as a file in the request body
    //const image = req.file;

    //if (!image) {
    // return res
    //   .status(400)
    //    .json({ status: "error", msg: "No image uploaded." });
    //}

    // const imageUrl = await uploadToGCP(image.buffer, image.originalname);

    await pool.query(
      "INSERT INTO Event (eventname, eventdescription, eventdatetime, eventseatcapacity, eventlaunchdate, eventvenue, city, state, eventaddress, postalcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [
        req.body.eventname,
        req.body.eventdescription,
        req.body.eventdatetime,
        //req.body.imageurl,
        req.body.eventseatcapacity,
        req.body.eventlaunchdate,
        req.body.eventvenue,
        req.body.city,
        req.body.state,
        req.body.eventaddress,
        req.body.postalcode,
      ]
    );

    res.status(200).json({ status: "ok", msg: "Event created successfully" });
  } catch (err) {
    console.error("Error creating event:", err.message);
    res.status(400).json({ status: "error", msg: "Failed to create event" });
  }
};

const getAllEvent = async (req, res) => {
  try {
    const events = await pool.query("SELECT * FROM EVENT");
    res.status(200).json(events.rows);
  } catch (error) {
    console.error("Error retrieving events:", error.message);
    res.status(500).json({ error: "Failed to retrieve events" });
  }
};

const getEventById = async (req, res) => {
  const eventId = req.params.eventId; // Assuming eventId is passed in the request parameters

  try {
    const event = await pool.query("SELECT * FROM EVENT WHERE eventid = $1", [
      eventId,
    ]);

    if (event.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ event: event.rows[0] });
  } catch (error) {
    console.error("Error getting event:", error);
    res.status(500).json({ error: "Failed to get event" });
  }
};

const deleteEventById = async (req, res) => {
  const eventId = req.params.eventId; // Assuming eventId is passed in the request parameters

  try {
    const events = await pool.query("DELETE FROM EVENT WHERE eventid = $1", [
      eventId,
    ]);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

const updateEventById = async (req, res) => {
  const eventId = req.params.eventId;
  const eventData = req.body;

  try {
    // Construct the SET clause dynamically based on the eventData object
    const setClause = Object.keys(eventData)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    // Prepare the array of values for the parameters
    const values = Object.values(eventData);
    values.push(eventId); // Add the eventId to the end of the array
    const query = `
      UPDATE event
      SET ${setClause}
      WHERE eventid = $${values.length}
    `;

    // Execute the query with the array of values
    await pool.query(query, values);

    console.log("Event updated successfully");

    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const reserveEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.params.userId;

    // Check if the event exists
    const event = await pool.query("SELECT * FROM event WHERE eventid = $1", [
      eventId,
    ]);
    if (event.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Check if the user exists
    const users = await pool.query("SELECT * FROM users WHERE userid = $1", [
      userId,
    ]);
    if (users.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const eventCapacity = event.rows[0].eventseatcapacity;
    // const reservedSeats = event.rows[0].eventseat;
    const currentReservedSeats = reservedSeats - req.body.quantity;

    // Check if there are enough available seats
    if (currentReservedSeats <= eventCapacity) {
      // Update the event table with the new number of reserved seats
      await pool.query(
        "UPDATE event SET reservedseats = $1 WHERE eventid = $2",
        [currentReservedSeats, eventId]
      );

      // Insert booking details into the bookings table
      await pool.query(
        "INSERT INTO bookings (eventid, userid, quantity) VALUES ($1, $2, $3)",
        [eventId, userId, req.body.quantity]
      );

      res.status(200).json({ message: "Reservation successful" });
    } else {
      res.status(400).json({ error: "Event is full" });
    }
  } catch (error) {
    console.error("Error reserving event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createEvent,
  uploadToGCP,
  getAllEvent,
  deleteEventById,
  updateEventById,
  uploadAsset,
  getEventById,
  reserveEventById,
};
