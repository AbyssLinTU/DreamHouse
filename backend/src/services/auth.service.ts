import generateTokens from "../utils/generateTokens";
import prisma from "../utils/prisma";
import argon2 from "argon2";
import { v4 } from "uuid";
import tokenService from "./token.service";
import mailService from "./mail.service";
import { ApiError } from "../utils/errorApi";

const authService = {
    login: async (data: any) => {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });
        
        if (!user || !user?.password) {
            throw ApiError.BadRequest("Неверный email или пароль");
        }
        
        const isCorrectPassword = await argon2.verify(user.password, data.password);
        if (!isCorrectPassword) {
            throw ApiError.BadRequest("Неверный email или пароль");
        }
        
        const tokens = generateTokens(user);
        await tokenService.saveToken(tokens.refreshToken, user.id);
        
        return tokens;
    },
    
    register: async (user: any) => {
        const existingUser = await prisma.user.findUnique({ where: { email: user.email } });
        if (existingUser) {
            throw ApiError.BadRequest("Пользователь уже существует");
        }
        
        const activateLink = v4();
        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: await argon2.hash(user.password),
                activateLink,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
            },
        });
        
        const tokens = generateTokens(newUser);
        await tokenService.saveToken(tokens.refreshToken, newUser.id);
        // mailService.sendActivationMail(user.email, `` + process.env.CLIENT_URL + "/activate/" + activateLink);
        
        return tokens;
    },
    
    logout: async (token: string) => {
        return await tokenService.clearToken(token);
    },
    
    refresh: async (token: string) => {
        if (!token) {
            throw ApiError.UnauthorizedError();
        }
        
        const userData = tokenService.validateRefreshToken(token) as any;
        const TokenFromDb = await prisma.token.findUnique({ where: { refreshToken: token } });
        
        if (!userData?.id || !TokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        
        const user = await prisma.user.findUnique({ where: { id: userData.id } });
        if (!user) {
            throw ApiError.UnauthorizedError();
        }
        
        const tokens = generateTokens(user);
        await tokenService.saveToken(tokens.refreshToken, user.id);
        
        return tokens;
    },
    checkAdmin: async () => {
        return true;
    },
};
export default authService;