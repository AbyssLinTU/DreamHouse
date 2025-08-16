import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errorApi";

export default function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);

    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }

    return res.status(500).json({ message: 'Непредвиденная ошибка сервера' });
}