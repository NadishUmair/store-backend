const express = require("express");
const upload = require("../util/uploadHelper");
const {
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetAllProducts,
} = require("../controller/productController");
const router = express.Router();

router.post("/create-product", upload.single("productImg"), CreateProduct);
router.put("/updateproduct/:id", upload.single("productImg"), UpdateProduct);
router.delete("/deleteproduct/:id", DeleteProduct);
router.get("/all-products", GetAllProducts);

module.exports = router;
