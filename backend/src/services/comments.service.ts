import prisma from "../utils/prisma"

const CommentsService = {
    getComments: async () => {
        const comments = await prisma.comment.findMany()
        return comments
    },
    getCommentsByProductId: async (id: number) => {
        const comments = await prisma.comment.findMany({
            where: {
                productId: id
            }
        })
        return comments
    },
    createComment: async (comment: any) => {
        const newComment = await prisma.comment.create({
            data: comment
        })
        const comments = await prisma.comment.findMany()
        await prisma.product.update({
            where: {
                id: comment.productId
            },
            data: {
               rating: comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length
            }
        })

        return newComment
    },
    updateComment: async (id: number, comment: any) => {
        const updatedComment = await prisma.comment.update({
            where: {
                id
            },
            data: comment
        })
        return updatedComment
    },
    deleteComment: async (id: number) => {
        const deletedComment = await prisma.comment.delete({
            where: {
                id
            }
        })
        const comments = await prisma.comment.findMany()
        await prisma.product.update({
            where: {
                id: deletedComment.productId
            },
            data: {
               rating: comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length
            }
        })
        return deletedComment
    },
}
export default CommentsService