import { Action, createReducer, on } from "@ngrx/store";
import { Address } from "src/app/models/address";
import { Cart } from "src/app/models/cart";
import { Customer } from "src/app/models/customer";
import { MenuItem } from "src/app/models/menu";
import { addItemToCartAction, changeCustomerAction, changeDeliveryAction, changeDeliveryAddressAction, emptyCartAction, reduceItemFromCartAction, removeCustomerAction, removeItemFromCartAction } from "./actions";

const initialState = null;

const _cartReducer = createReducer(
    (() => {
        if (initialState == null) {
            let cart = localStorage.getItem('cart');
            // console.log(auth)
            if (cart != null) {
                return JSON.parse(cart);
            }
        }
        if (!initialState) {
            return new Cart();
        }
        return initialState;
    })(),

    on(addItemToCartAction, (state: Cart, action: MenuItem) => {
        let _items: MenuItem[] = [];
        let _total = 0;
        if (state.items && state.items.length > 0) {
            let added = false;
            state.items.forEach(ci => {
                let _ci = { ...ci }
                if (ci.id == action.id) {
                    _ci.quantity += 1;
                    _ci.total = _ci.quantity * _ci.price;
                    added = true;
                }
                _total += _ci.total;
                _items.push(_ci)
            })
            if (!added) {
                let _i = { ...action, quantity: 1, total: action.price };
                _total += _i.total;
                _items.push(_i)
            }
        } else {
            let _i = { ...action, quantity: 1, total: action.price };
            _total += _i.total;
            _items.push(_i)
        }

        let _cart = { ...state, items: _items, total: _total };
        localStorage.setItem('cart', JSON.stringify(_cart))
        return _cart;
        // state.username = action.username;
    }),

    on(reduceItemFromCartAction, (state: Cart, action: { id: number }) => {
        let _items: MenuItem[] = [];
        let _total = 0;
        state.items.forEach(i => {
            let _i = { ...i };
            if (_i.id == action.id && _i.quantity > 0) {
                --_i.quantity;
            } else {

            }
            _i.total = _i.quantity * _i.price;
            _total += _i.total;
            if (_i.quantity > 0)
                _items.push(_i)
        })
        let _cart = { ...state, items: _items, total: _total }
        localStorage.setItem('cart', JSON.stringify(_cart))
        return _cart
    }),

    on(removeItemFromCartAction, (state: Cart, action: { id: number }) => {
        let _items: MenuItem[] = [];
        let _total = 0;
        state.items.forEach(i => {
            let _i = { ...i };
            if (_i.id != action.id) {
                _i.total = _i.quantity * _i.price;
                _total += _i.total;
                _items.push(_i)
            }
        })
        let _cart = { ...state, items: _items, total: _total }
        localStorage.setItem('cart', JSON.stringify(_cart))
        return _cart
    }),
    on(emptyCartAction, () => {
        let _cart = { items: [], total: 0 };
        localStorage.setItem('cart', JSON.stringify(_cart))
        return _cart
    }),
    on(changeCustomerAction, (state: Cart, action: Customer) => {
        let _cart = { ...state, customer: { ...action } }
        localStorage.setItem('cart', JSON.stringify(_cart))
        return _cart
    }),
    on(removeCustomerAction, (state: Cart) => {
        let _cart = { ...state, customer: undefined }
        localStorage.setItem('cart', JSON.stringify(_cart))
        return _cart
    }),
    on(changeDeliveryAction, (state: Cart) => {
        let _cart = { ...state, isDelivery: !state.isDelivery, address: undefined }
        localStorage.setItem('cart', JSON.stringify(_cart))
        return _cart
    }),
    on(changeDeliveryAddressAction, (state: Cart, action: Address) => {
        let _cart = { ...state, address: { ...action } }
        localStorage.setItem('cart', JSON.stringify(_cart))
        return _cart
    }),
)

export function cartReducer(state: any, action: Action) {
    return _cartReducer(state, action);
}