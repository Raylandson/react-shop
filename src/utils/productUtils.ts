import productData from "../data/products.json";
import type { Product } from "../types/Product";

export const getProductsByCategory = (
  category: "processors" | "memory" | "graphics"
): Product[] => {
  return productData.categories[category];
};

export const getProductById = (id: string): Product | undefined => {
  const allProducts = [
    ...productData.categories.processors,
    ...productData.categories.memory,
    ...productData.categories.graphics,
  ];

  return allProducts.find((product) => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const allProducts = [
    ...productData.categories.processors,
    ...productData.categories.memory,
    ...productData.categories.graphics,
  ];

  const searchTerm = query.toLowerCase();
  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export const calculateInstallments = (
  price: number,
  installments: number = 12
): string => {
  const installmentValue = price / installments;
  return formatPrice(installmentValue);
};
