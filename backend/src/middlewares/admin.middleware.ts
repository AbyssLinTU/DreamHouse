import { Request,Response, NextFunction } from "express";
import tokenService from "../services/token.service";
import { User } from "../generated/prisma";
import prisma from "../utils/prisma";

const AdminMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const user = await tokenService.validateAccessToken(token) as User;
        if (!user) {
            return res.status(403).json({ error: 'Forbidden' });
            
        }
        const role = await prisma.role.findFirst({ where: { users: { some: { id: user.id } } }} );
        if (role?.value !== 'ADMIN') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    } catch (error) {
        console.error('Error checking admin role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export default AdminMiddleware