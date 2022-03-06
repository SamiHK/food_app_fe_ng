import { Address } from "./address";
import { Customer } from "./customer";
import { MenuItem } from "./menu";

export class Cart {
    isDelivery = true
    address?: Address
    customer?: Customer
    items: MenuItem[] = []
    _total = 0;
    

    get total() {
        this.items.forEach(m => this._total += m.price * m.quantity);
        return this._total;
    }
}
