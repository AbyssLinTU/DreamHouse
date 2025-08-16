import { IProduct, IProductDto } from "@/types/product.types";
import api from "@/utils/api";
import { AxiosResponse } from "axios";

class ProductService {
  private static API_URL = "/products/";

  static async getProducts() {
    return await api.get(this.API_URL);
  }

  static async getProductById(id: number) {
    return await api.get(`${this.API_URL}${id}`);
  }

  static async createProduct(body: IProductDto): Promise<AxiosResponse<IProduct>> {
    return await api.post<IProduct>(this.API_URL, body);
  }

  static async removeProduct(id: number) {
    return await api.delete(`${this.API_URL}${id}`);
  }
}

export default ProductService;