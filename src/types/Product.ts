import { AppDispatch } from "../redux/store";
import { CartItem } from "./Cart";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
}

export interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
}

export interface ProductCardProps {
  product: Product; 
  items: CartItem[];
  dispatch: AppDispatch; 
  onAddToCart: (product: Product, items: CartItem[], dispatch: AppDispatch) => void; 
}

export interface SingleProductProps {
  onAddToCart: (product: Product, items: CartItem[], dispatch: AppDispatch) => void; 
}

export interface AddProductData {
  title: String;
  description: string;
  price: number;
  images: string[];
  categoryId: Number;
}

export interface ProductData {
  id: Number;
  title: String;
  description: string;
  price: number;
  images: string[];
  categoryId: Number;
}

export interface updateProductProps {
  product: Product;
}