const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.get("/test", (req, res) => {
    res.send("Hello world!");
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: "config/.env",
    });
}

// import routes
const user = require("./controller/user");

app.use("/api/v2/user", user);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
