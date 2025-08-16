import CommentsService from "../services/comments.service";
import { Request, Response } from "express";
const CommentsController = {
    createComment: async (req: Request, res: Response) => {
        try {
            const comment = await CommentsService.createComment(req.body);
            res.status(201).json(comment);
        } catch (error) {
            console.error("Error creating comment:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getComments: async (req: Request, res: Response) => {
        try {
            const comments = await CommentsService.getComments();
            res.status(200).json(comments);
        } catch (error) {
            console.error("Error getting comments:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    getCommentsByProductId: async (req: Request, res: Response) => {
        try {
            const comments = await CommentsService.getCommentsByProductId(Number(req.params.id));
            res.status(200).json(comments);
        } catch (error) {
            console.error("Error getting comments by product ID:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    deleteComment: async (req: Request, res: Response) => {
        try {
            const comment = await CommentsService.deleteComment(Number(req.params.id));
            res.status(200).json(comment);
        } catch (error) {
            console.error("Error deleting comment:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
    updateComment: async (req: Request, res: Response) => {
        try {
            const comment = await CommentsService.updateComment(Number(req.params.id), req.body);
            res.status(200).json(comment);
        } catch (error) {
            console.error("Error updating comment:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

};
export default CommentsController