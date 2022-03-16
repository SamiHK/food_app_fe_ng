import { Address } from "./address";
import { Branch } from "./branch";
import { Customer } from "./customer";
import { MenuItem } from "./menu";

export class Order {
    id?: number
    isDelivery?: boolean
    address?: Address
    branchId?: string
    branch?: Branch
    customer?: Customer
    items: MenuItem[] = []
    subTotal = 0;
    deliveryCharges?: number;
    gst?: number;
    total?: number;
    status?: OrderStatus
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