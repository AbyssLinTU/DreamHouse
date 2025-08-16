import AuthService from "@/services/auth.service"
import { IAuthResponse, IRegister } from "@/types/auth.types"
import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

const useRegister = ()=>{
    return useMutation({
        mutationKey:['register'],
        mutationFn:async(registerData:IRegister):Promise<AxiosResponse<IAuthResponse>>=>{
            const response = await AuthService.register(registerData);
            localStorage.setItem('token', response.data.accessToken)
            return response
        },
    })
}
export default useRegister