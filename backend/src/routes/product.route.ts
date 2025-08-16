import { Router } from "express";
import productController from "../controllers/product.controller";

const productRoute = Router();

productRoute.get("/",productController.getProducts)
productRoute.get("/:id",productController.getProduct)
productRoute.post("/",productController.createProduct)
productRoute.put("/",productController.updateProduct)
productRoute.delete("/:id",productController.deleteProduct)
productRoute.get("/search/:search",productController.getProductsBySearch)
productRoute.get("/category/:category",productController.getProductsByCategory)
productRoute.get("/category/:category/price/:min/:max",productController.getProductsByCategoryAndPrice)
productRoute.get("/price/:min/:max",productController.getProductsByPrice)

export default productRoute