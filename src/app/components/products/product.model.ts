export interface ProductItem {
  id: number;
  title: string;
  description: string;
  price: number;
}

export interface Product {
  skip: number;
  limit: number;
  total: number;
  products: ProductItem[];
}
