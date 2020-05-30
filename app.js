const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "PATCH, POST, GET, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.send(200);
  }
  next();
});

const orderRoutes = require("./api/routes/orders");
const restaurantRoutes = require("./api/routes/restaurant");
const foodRoutes = require("./api/routes/food");
const usersRoutes = require("./api/routes/users");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://ToGoFoodApp:" +
    process.env.MONGO_ATLAS_PW +
    "@togofoodapp-cbi4c.mongodb.net/test?retryWrites=true&w=majority",
  {
    useMongoClient: true,
  }
);

app.use("/orders", orderRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/food", foodRoutes);
app.use("/users", usersRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
