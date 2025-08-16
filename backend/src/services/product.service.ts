import prisma from "../utils/prisma"

const productService = {
    async getProducts() {
        const products = await prisma.product.findMany()
        return products
    },
    async getProduct(id: number) {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        })
        return product
    },
    async createProduct(product: any) {
        const newProduct = await prisma.product.create({
            data: product
        })
        return newProduct
    },
    async deleteProduct(id: number) {
        const deletedProduct = await prisma.product.delete({
            where: {
                id
            }
        })
        return deletedProduct
    },
    async updateProduct(id: number, product: any) {
        const updatedProduct = await prisma.product.update({
            where: {
                id
            },
            data: product
        })
        return updatedProduct
    },
    async getProductsByCategory(category: string) {
        const products = await prisma.product.findMany({
            where: {
                category
            }
        })
        return products
    },
    async getProductsByPrice(min: number, max: number) {
        const products = await prisma.product.findMany({
            where: {
                price: {
                    gte: min,
                    lte: max
                }
            }
        })
        return products
    },
    async getProductsByCategoryAndPrice(category: string, min: number, max: number) {
        const products = await prisma.product.findMany({
            where: {
                category,
                price: {
                    gte: min,
                    lte: max
                }
            }
        })
        return products
    },
    async getProductsBySearch(search: string) {
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: search
                }
            }
        })
        return products
    }
}
export default productService