const path = require('path'); 
const fs = require('fs');
const ProductModel = require("../model/productModel");

exports.CreateProduct = async (req, res) => {
  try {
    console.log("product create",req.body);
    const { productName, productPrice,prevPrice,productDescription,productCategory } = req.body;
    if (!productName && !productPrice) {
      return res.status(400).json({ message: "All Fields are required" });
    }
    const productNameLowerCase = productName.toLowerCase();
    const productImg = req.file ? "uploads/" + req.file.filename : null;

    const newProduct = new ProductModel({
      productName: productNameLowerCase,
      productPrice,
      prevPrice,
      product_Description:productDescription,
      productImg: productImg,
      productCategory:productCategory
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
};

exports.DeleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    if (product.productImg) {
      const fullPath = path.join(__dirname, "..", product.productImg);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

exports.UpdateProduct = async (req, res) => {
  const productId = req.params.id;
  const { productName, productPrice } = req.body;

  const productImg = req.file ? "uploads/" + req.file.filename : null;

  try {
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    if (product.productImg) {
      const oldImagePath = path.join(__dirname, "..", product.productImg);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    if (productName) product.productName = productName.toLowerCase();
    if (productPrice) product.productPrice = productPrice;
    if (productImg) product.productImg = productImg;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully!",
      product: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};


exports.GetAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await ProductModel.find().skip(skip).limit(limit);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    const productsWithImageUrls = products.map((product) => ({
      ...product.toObject(),
      productImg: `http://localhost:4000/${product.productImg}`,
    }));

    res.status(200).json({
      message: "Products retrieved successfully",
      products: productsWithImageUrls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving products" });
  }
};
