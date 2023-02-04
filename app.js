const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

//route imports
const bloodinfo = require("./routes/bloodRoute");
const user = require("./routes/userRoute");
const order = require("./routes/bloodReqRoute");

app.use("/api/v1",bloodinfo);
app.use("/api/v1",user);
app.use("/api/v1",order);

//Middleware For Error

app.use(errorMiddleware);

module.exports = app;