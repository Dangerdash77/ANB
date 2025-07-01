const express = require("express");
const multer = require("multer");
const {
  getProducts,
  registerProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

const productRoutes = express.Router();

// Configure multer to store images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
productRoutes.get("/all", getProducts);

// ✅ Add new product with image
productRoutes.post("/add-product", upload.single("image"), registerProduct);

// ✅ Update product with image (optional)
productRoutes.put("/product/:id", upload.single("image"), updateProduct);

// ✅ Delete product
productRoutes.delete("/product/:id", deleteProduct);

module.exports = productRoutes;
