import { createAction, props } from "@ngrx/store";
import { Address } from "src/app/models/address";
import { Customer } from "src/app/models/customer";
import { MenuItem } from "src/app/models/menu";

export const addItemToCartAction = createAction('[Add item to Cart]', props<MenuItem>());
export const reduceItemFromCartAction = createAction('[Reduce item from Cart]', props<{id: number}>());
export const removeItemFromCartAction = createAction('[Remove item from Cart]', props<{id: number}>());
export const emptyCartAction = createAction('[Empty Cart]');
export const changeCustomerAction = createAction('[Change Customer]', props<Customer>());
export const removeCustomerAction = createAction('[Remove Customer]');
export const changeDeliveryAction = createAction('[Change Is Delivery]');
export const changeDeliveryAddressAction = createAction('[Change Delivery Address]', props<Address>());
// export const removeFromCart = createAction('[Auth Logout]');