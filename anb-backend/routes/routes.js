const express = require("express");
const userRoutes = require("./userRoutes");
const productRoutes = require("./productRoutes");
const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/products", productRoutes);


module.exports = routes;