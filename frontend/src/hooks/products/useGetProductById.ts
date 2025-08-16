import ProductService from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

const useGetProductById = (id: number) => { 
    return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
        const response = await ProductService.getProductById(id);
        return response.data;
    },
    enabled: !!id
})};

export default useGetProductById;
