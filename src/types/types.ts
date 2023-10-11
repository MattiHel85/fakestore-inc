import { Product } from "./Product";
import { CartItem } from "./Cart";
import { AppDispatch } from "../redux/store";

export interface HeaderProps {
    title: string
    body?: string | null
}

export interface HomeProps {
    productOfTheMonthId: number | undefined;
}