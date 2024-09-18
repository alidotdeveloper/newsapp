const express = require("express");
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '.env')});
const userRoute = require("./routes/user-route");
const postRoute = require("./routes/post-route");
const ConnectDb = require("./db/connection");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;

//cors option
//cors
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};


//middleware
const app = express();
const cors = require("cors");
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//db connection
ConnectDb();

//routes
app.use("/api/", userRoute);
app.use("/api/", postRoute);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
