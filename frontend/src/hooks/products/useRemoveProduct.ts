import ProductService from "@/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveProduct = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await ProductService.removeProduct(id);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
        }
    });
};

export default useRemoveProduct;
