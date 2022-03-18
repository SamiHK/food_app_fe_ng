import { Address } from "./address";
import { Branch } from "./branch";
import { Customer } from "./customer";
import { MenuItem } from "./menu";
import { SalesPerson } from "./sales-person";

export class Order {
    id?: number
    isDelivery?: boolean
    address?: Address
    branchId?: string
    branch?: Branch
    salesperson?: SalesPerson
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
    DISPATCHED = 'DISPATCHED',
    DELIVERED = 'DELIVERED',
    RETURNED = 'RETURNED',
    CANCELED = 'CANCELED',
    COMPLETED = 'COMPLETED'
}