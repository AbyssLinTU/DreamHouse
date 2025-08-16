export interface IRegister {
    name: string,
    email: string,
    password: string
}

export interface ILogin {
    email: string,
    password: string
}

export interface IAuthResponse {
    accessToken: string,
    refreshToken: string
}
export interface ILogoutResponse {
    id: number,
    userId: number,
    refreshToken: string,
}