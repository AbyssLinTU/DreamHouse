import AuthService from "@/services/auth.service"
import { IAuthResponse, ILogin } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

const useLogin = ()=>{
    return useMutation({
        mutationKey:['login'],
        mutationFn:async(loginData:ILogin):Promise<AxiosResponse<IAuthResponse>>=>{
            const response = await AuthService.login(loginData);
            localStorage.setItem('token', response.data.accessToken)
            return response
        },
    })
}
export default useLogin