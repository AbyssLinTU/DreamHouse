import ProductService from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from '@/types/product.types';

const useGetProducts = () => { 
    return useQuery<IProduct[]>({
    queryKey: ['products'],
    queryFn: async () => {
        const response = await ProductService.getProducts();
        return response.data;
    }
})};

export default useGetProducts;