import { MenuItem } from "./menu";

export class Cart {
    isDelivery = true
    items: MenuItem[] = []
    _total = 0;

    get total() {
        this.items.forEach(m => this._total += m.price * m.quantity);
        return this._total;
    }

    addItem(m: MenuItem){
        let _m = this.items.find(i => i.id == m.id);
        if(!_m){
            m.quantity = 1;
            this.items.push(m)
        } else {
            _m.quantity++;
        }
    }
}
