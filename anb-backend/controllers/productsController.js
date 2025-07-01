const Product = require("../models/Product");

// ✅ Get all products (with base64 image conversion)
async function getProducts(req, res) {
  try {
    const products = await Product.find();
    console.log(products);
    const formattedProducts = products.map((product) => ({
      ...product._doc,
      image:
        product.image && product.image.data
          ? `data:${product.image.contentType};base64,${product.image.data.toString("base64")}`
          : null,
    }));
    res.json({ success: true, products: formattedProducts });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
}

// ✅ Register product (with multer upload)
async function registerProduct(req, res) {
  const { name, minQty, size, color, material, stdPacking } = req.body;

  if (!name || !minQty) {
    return res
      .status(400)
      .json({ success: false, message: "Required fields missing" });
  }

  try {
    const productData = {
      name,
      minQty,
      size,
      color,
      material,
      stdPacking,
    };

    // 🟡 Handle image if uploaded
    if (req.file) {
      productData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const product = new Product(productData);
    await product.save();
    res.status(201).json({ success: true, message: "Product added", product });
  } catch (err) {
    console.error("Add product error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error while adding product" });
  }
}

// ✅ Update product (supporting image update)
async function updateProduct(req, res) {
  try {
    const updateData = { ...req.body };

    // 🟡 If new image uploaded
    if (req.file) {
      updateData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.json({
      success: true,
      product: updated,
      message: "Product detail updated successfully",
    });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
}

// ✅ Delete product
async function deleteProduct(req, res) {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
}

module.exports = {
  getProducts,
  registerProduct,
  updateProduct,
  deleteProduct,
};
