import { CartItem } from "./cart-item";

export interface OrderDetail {
    id: string,
    date: string,
    name: string,
    phone: number,
    address: string,
    email: string,
    products: string,
    total: number
}
