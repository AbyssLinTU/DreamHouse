import jwt from 'jsonwebtoken';
const generateTokens = (data: any) => {
    const accessToken = jwt.sign(data, process.env.SECRET_ACCESS_KEY as string , { expiresIn: '1h' });
    const refreshToken = jwt.sign(data, process.env.SECRET_REFRESH_KEY as string , { expiresIn: '30d' });
    return { accessToken, refreshToken };
};

export default generateTokens