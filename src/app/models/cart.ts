import { Address } from "./address";
import { Branch } from "./branch";
import { Customer } from "./customer";
import { MenuItem } from "./menu";

export class Cart {
    isDelivery = true
    address?: Address
    customer?: Customer
    branchId?: string
    branch?: Branch
    items: MenuItem[] = []
    subTotal = 0
}
