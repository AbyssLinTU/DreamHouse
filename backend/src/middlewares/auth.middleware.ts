import { Request,Response, NextFunction } from "express";
import tokenService from "../services/token.service";
const AuthMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const user = await tokenService.validateAccessToken(token)
        if (!user) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    } catch (error) {
        console.error('Error checking authentication:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export default AuthMiddleware