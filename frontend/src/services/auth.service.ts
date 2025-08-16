import { IAuthResponse, ILogin, ILogoutResponse, IRegister } from "@/types/auth.types";
import api from "@/utils/api";
import { AxiosResponse } from "axios";

class AuthService {
    private static API_URL = "/auth/";
    static async register(registerData:IRegister): Promise<AxiosResponse<IAuthResponse>> {
        return await api.post<IAuthResponse>(`${this.API_URL}register`,registerData);
    }
    static async login(loginData:ILogin): Promise<AxiosResponse<IAuthResponse>> {
        return await api.post<IAuthResponse>(`${this.API_URL}login`,loginData);
    }
    static async logout(): Promise<AxiosResponse<ILogoutResponse>> {
        return await api.post<ILogoutResponse>(`${this.API_URL}logout`);
    }

    static async refresh(): Promise<AxiosResponse<IAuthResponse>> {
        return await api.get<IAuthResponse>(`${this.API_URL}refresh`);
    }
}
export default AuthService