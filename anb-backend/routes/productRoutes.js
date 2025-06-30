const express = require("express");
const {
  getProducts,
  registerProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");
const productRoutes = express.Router();

productRoutes.get("/all", getProducts);
productRoutes.post("/add-product", registerProduct);
productRoutes.put("/product/:id", updateProduct);
productRoutes.delete("/product/:id", deleteProduct);

module.exports = productRoutes;
