import { Product } from "./Product";
import { CartItem } from "./Cart";
import { AppDispatch } from "../redux/store";

export interface HeaderProps {
    title: string
}

export interface HomeProps {
    productOfTheMonthId: number | undefined;
    productOfTheMonth: Product | undefined;
    onAddToCart: (product: Product, items: CartItem[], dispatch: AppDispatch) => void; 
    setProductOfTheMonth: (arg0: Product | undefined) => void;
  }