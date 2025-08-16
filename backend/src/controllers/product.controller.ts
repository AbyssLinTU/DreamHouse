import { Response, Request } from "express";
import productService from "../services/product.service";

const productController = {
    createProduct: async (req: Request, res: Response) => {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            console.error("Error creating product:", error);
            // Возвращаем статус 500 для внутренних ошибок сервера
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getProducts: async (req: Request, res: Response) => {
        try {
            const products = await productService.getProducts();
            res.status(200).json(products);
        } catch (error) {
            console.error("Error getting products:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getProduct: async (req: Request, res: Response) => {
        try {
            const product = await productService.getProduct(Number(req.params.id));
            // Проверяем, существует ли продукт
            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error("Error getting product:", error);
            // Если ошибка связана с неправильным ID, можно вернуть 400
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    updateProduct: async (req: Request, res: Response) => {
        try {
            const product = await productService.updateProduct(Number(req.params.id), req.body);
            if (!product) {
                 return res.status(404).json({ error: "Product not found" });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error("Error updating product:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    deleteProduct: async (req: Request, res: Response) => {
        try {
            const product = await productService.deleteProduct(Number(req.params.id));
            if (!product) {
                 return res.status(404).json({ error: "Product not found" });
            }
            res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getProductsByPrice: async (req: Request, res: Response) => {
        try {
            const products = await productService.getProductsByPrice(Number(req.params.min), Number(req.params.max));
            res.status(200).json(products);
        } catch (error) {
            console.error("Error getting products by price:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getProductsByCategory: async (req: Request, res: Response) => {
        try {
            const products = await productService.getProductsByCategory(req.params.category);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error getting products by category:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getProductsByCategoryAndPrice: async (req: Request, res: Response) => {
        try {
            const products = await productService.getProductsByCategoryAndPrice(req.params.category, Number(req.params.min), Number(req.params.max));
            res.status(200).json(products);
        } catch (error) {
            console.error("Error getting products by category and price:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getProductsBySearch: async (req: Request, res: Response) => {
        try {
            const products = await productService.getProductsBySearch(req.params.search);
            res.status(200).json(products);
        } catch (error) {
            console.error("Error getting products by search:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

export default productController;
