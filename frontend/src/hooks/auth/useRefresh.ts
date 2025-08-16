import AuthService from "@/services/auth.service"
import { IAuthResponse } from "@/types/auth.types"
import {  useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

const useRefresh = ()=>{
    return useQuery({
        queryKey:['refresh'],
        queryFn:async():Promise<AxiosResponse<IAuthResponse>>=>{
            const response = await AuthService.refresh();
            localStorage.setItem('token', response.data.accessToken)
            return response
        },
    })
}
export default useRefresh