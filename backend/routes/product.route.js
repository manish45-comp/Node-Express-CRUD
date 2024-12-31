import express from "express";
import {
  deleteProduct,
  getProducts,
  insertProduct,
  updateProduct,
} from "../controllers/product.controller.js";
const router = express.Router();

router.get("/", getProducts);
router.post("/", insertProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
