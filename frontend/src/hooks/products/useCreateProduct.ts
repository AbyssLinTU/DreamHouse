import ProductService from "@/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProductDto } from '@/types/product.types';

const useCreateProduct = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (product: IProductDto) => {
            console.log(product);
            const response = await ProductService.createProduct(product);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });
};

export default useCreateProduct;
