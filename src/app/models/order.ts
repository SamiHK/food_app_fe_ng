import { Address } from "./address";
import { Customer } from "./customer";
import { MenuItem } from "./menu";

export class Order {
    id?: number
    isDelivery?: boolean
    address?: Address
    customer?: Customer
    items: MenuItem[] = []
    subTotal = 0;
    deliveryCharges?: number;
    orderStatus?: OrderStatus
    createdOn?: string
    updatedOn?: string
}


export enum OrderStatus {
    IN_CART = 'IN_CART', 
    PENDING = 'PENDING', 
    ACCEPTED = 'ACCEPTED', 
    IN_PROGRESS = 'IN_PROGRESS',
    DISPATCH = 'DISPATCH',
    DELIVERED = 'DELIVERED',
    RETURN = 'RETURN',
    CANCELED = 'CANCELED' 
}