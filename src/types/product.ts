export type ProductCategory =
  | "Medical Devices"
  | "Diagnostics"
  | "Patient Care"
  | "Software"
  | "Pharmacy";

export type ProductStatus = "active" | "low-stock" | "out-of-stock";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: ProductStatus;
  sku: string;
  image: string;
  updatedAt: string;
}
