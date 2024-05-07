const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db/db"); // Import your PostgreSQL connection pool

const signup = async (req, res) => {
  try {
    // Check if the email is already registered
    const existingUser = await pool.query(
      "SELECT * FROM Users WHERE email = $1",
      [req.body.email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        status: "error",
        msg: "Duplicate email, user already registered",
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(req.body.password, 12);

    // Insert the new user into the database
    const userQueryResult = await pool.query(
      "INSERT INTO Users (UserType, Email, Password) VALUES ($1, $2, $3) RETURNING UserID",
      ["user", req.body.email, passwordHash]
    );
    const userID = userQueryResult.rows[0].userid; // Get the inserted UserID

    // Insert the user into the EventAttendee table with first name and last name
    await pool.query(
      "INSERT INTO User (UserID, UserType, Email, Mobile, FirstName, LastName) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        userID,
        "user",
        req.body.email,
        req.body.mobile,
        req.body.firstName,
        req.body.lastName,
      ]
    );

    res.status(200).json({ status: "ok", msg: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(400).json({ status: "error", msg: "Failed registration" });
  }
};

// const signupOrg = async (req, res) => {
//   try {
//     // Check if the email is already registered
//     const existingUser = await pool.query(
//       "SELECT * FROM Users WHERE email = $1",
//       [req.body.email]
//     );
//     if (existingUser.rows.length > 0) {
//       return res.status(400).json({
//         status: "error",
//         msg: "Duplicate email, user already registered",
//       });
//     }

//     // Hash the password
//     const passwordHash = await bcrypt.hash(req.body.password, 12);

//     // Insert the new user into the database
//     const userQueryResult = await pool.query(
//       "INSERT INTO Users (UserType, Email, Password) VALUES ($1, $2, $3) RETURNING UserID",
//       ["eventorganizer", req.body.email, passwordHash]
//     );
//     const userID = userQueryResult.rows[0].userid; // Corrected property name

//     // Insert the user into the EventOrganizer table with first name and last name
//     await pool.query(
//       "INSERT INTO eventorganizer (UserID, UserType, Email, CompanyName, Uennumber, phone, Address) VALUES ($1, $2, $3, $4, $5, $6, $7)",
//       [
//         userID,
//         "eventorganizer",
//         req.body.email,
//         req.body.companyName,
//         req.body.uennumber,
//         req.body.phone,
//         req.body.address,
//       ]
//     );

//     res.status(200).json({ status: "ok", msg: "User registered successfully" });
//   } catch (err) {
//     console.error("Error registering user:", err.message);
//     res.status(400).json({ status: "error", msg: "Failed registration" });
//   }
// };

const signin = async (req, res) => {
  try {
    // Check if the user exists in the database
    const result = await pool.query("SELECT * FROM Users WHERE email = $1", [
      req.body.email,
    ]);
    const user = result.rows[0];
    if (!user) {
      return res.status(400).json({ status: "error", msg: "Not authorized" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(400).json({ status: "error", msg: "Failed login" });
    }

    const tokenPayload = {
      userId: user.userid,
      usertype: user.usertype, // Include the user's type in the payload
    };

    const token = jwt.sign(tokenPayload, process.env.ACCESS_SECRET, {
      expiresIn: "1h",
      jwtid: uuidv4(),
    });

    res.json({ status: "ok", token });
  } catch (err) {
    console.error("Failed login:", err.message);
    res.status(400).json({ status: "error", msg: "Failed login" });
  }
};

const refresh = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ status: "error", msg: "No refresh token provided" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    // Generate a new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ status: "ok", accessToken });
  } catch (err) {
    console.error("Failed to refresh token:", err.message);
    res.status(403).json({ status: "error", msg: "Failed to refresh token" });
  }
};

module.exports = { signup, signin, refresh };
