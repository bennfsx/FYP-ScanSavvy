require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const pool = require("./src/db/db.js");
const { getUsers } = require("./src/controllers/userController.js");
const authRouter = require("./src/routers/authRouter");
const eventRouter = require("./src/routers/eventRouters");
const userRouter = require("./src/routers/userRouter");

// const { notFundError, serverError } = require("./error");
// const routes = require("./routes");

//Set rate limiter up
const limiter = rateLimit({
  windowsMs: 15 * 60 * 1000, //period in ms - 15 mins
  max: 100, //each ip limited to 100 req per window above
  standardHeaders: true, //sends back this header
  legacyHeaders: false, //disables x-regulate
});
//Initialise main app
const app = express();
app.use(cors()); //this opens to all domains
app.use(helmet());
app.use(limiter);

//Setup app to be able to consume paramters from URLs
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 6001;

app.listen(PORT, () => {
  console.log(`Server listening on the port ${PORT}`);
});

app.use("/auth", authRouter);
app.use("/api", eventRouter);
app.use("/user", userRouter);
