import mongoose from "mongoose";
import Product from "../Models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length > 0) {
      return res.status(200).json({ success: true, data: products });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
  } catch (error) {
    console.error("Error in fetching products", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const insertProduct = async (req, res) => {
  const product = req.body; // data send by uses
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in creating new product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error in updating product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product id" });
  }
  try {
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    await Product.findByIdAndDelete(id);
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleting product", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
