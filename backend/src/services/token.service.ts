import prisma from "../utils/prisma";
import jwt from "jsonwebtoken";
const tokenService = {
    saveToken: async (token: string, userId: number) => {
        const existToken = await prisma.token.findUnique({where: {userId}})
        if (existToken) {
            return await prisma.token.update({where: {userId}, data: {refreshToken: token}})
        } else {
            return await prisma.token.create({data: {refreshToken: token, userId}})
        }
    },
    clearToken: async (refreshToken: string) => {
        return await prisma.token.delete({where: {refreshToken},select:{
            id: true,
            userId: true,
            refreshToken: true
        }})
    },
    validateRefreshToken: async (token: string) => {
        const userData = jwt.verify(token, process.env.SECRET_REFRESH_KEY as string);
        return userData
    },
    validateAccessToken: async (token: string) => {
        const userData = jwt.verify(token, process.env.SECRET_ACCESS_KEY as string);
        return userData
    }
};
export default tokenService