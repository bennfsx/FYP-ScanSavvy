const jwt = require("jsonwebtoken");
// I thionk there must be a way to bring this down into 2 by adding multiple role returns?

const authUser = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({
      status: "error",
      msg: "No token found",
    });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET); //decode the token
      req.decoded = decoded; //update the req object with the decoded value
      next(); //pass the control to the next item
    } catch (err) {
      return res.status(403).json({ status: "error", msg: "missing token" });
    }
  }
};

const authEventAttendee = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (decoded.usertype === "eventattendee") {
        req.decoded = decoded;
        next();
      } else throw new Error();
    } catch (err) {
      console.error("err.message");
      return res.status(401).json({ status: "error", msg: "missing token" });
    }
  }
};

const authEventOrg = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (decoded.usertype === "eventorganizer") {
        req.decoded = decoded;
        next();
      } else throw new Error();
    } catch (err) {
      console.error("err.message");
      return res.status(401).json({ status: "error", msg: "missing token" });
    }
  }
};

const authAdmin = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", msg: "no token found" });
  }

  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      if (decoded.usertype === "admin") {
        req.decoded = decoded;
        next();
      } else throw new Error();
    } catch (err) {
      console.error("err.message");
      return res.status(401).json({ status: "error", msg: "missing token" });
    }
  }
};

module.exports = { authEventAttendee, authUser, authEventOrg, authAdmin };
