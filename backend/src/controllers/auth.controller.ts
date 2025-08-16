import authService from "../services/auth.service";
import { Request, Response, NextFunction } from "express"; // Добавили NextFunction
import { ApiError } from "../utils/errorApi";

const authController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await authService.register(req.body);
            res.cookie("refreshToken", response.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(201).json(response);
        } catch (error) {
            next(error); // Передаем ошибку в middleware
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await authService.login(req.body);
            res.cookie("refreshToken", response.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },
    logout: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.refreshToken;
            if (!token) {
                throw ApiError.UnauthorizedError(); // Бросаем кастомную ошибку
            }
            const response = await authService.logout(token);
            res.clearCookie("refreshToken");
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },
    activate: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // const response = await authService.activate(req.params.link);
            // res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },
    refresh: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.refreshToken;
            if (!token) {
                throw ApiError.UnauthorizedError();
            }
            const response = await authService.refresh(token);
            res.cookie("refreshToken", response.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    },
    checkAdmin: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await authService.checkAdmin();
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}

export default authController;