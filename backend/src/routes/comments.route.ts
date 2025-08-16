import { Router } from "express";
import CommentsController from "../controllers/comments.controller";

const commentRoute = Router();

commentRoute.get('/',CommentsController.getComments);
commentRoute.get('/:id',CommentsController.getCommentsByProductId);
commentRoute.post('/',CommentsController.createComment);
commentRoute.put('/:id',CommentsController.updateComment);
commentRoute.delete('/:id',CommentsController.deleteComment);

export default commentRoute