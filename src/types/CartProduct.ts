import type { Product } from "./Product";

export interface CartProduct {
  quantity: number;
  product: Product;
}
