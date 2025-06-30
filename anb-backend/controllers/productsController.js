
const Product = require("../models/Product");
async function getProducts(req, res) {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
}
//gvusu
async function registerProduct(req, res) {
  const { name, image, minQty, size, color, material, stdPacking } = req.body;
  if (!name || !image || !minQty) {
    return res
      .status(400)
      .json({ success: false, message: "Required fields missing" });
  }

  try {
    const product = new Product({
      name,
      image,
      minQty,
      size,
      color,
      material,
      stdPacking,
    });
    await product.save();
    res.status(201).json({ success: true, message: "Product added", product });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error while adding product" });
  }
}

async function updateProduct(req, res) {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      product: updated,
      message: "Product Detail updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating product" });
  }
}

async function deleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
}

module.exports = { getProducts, registerProduct, updateProduct, deleteProduct };
