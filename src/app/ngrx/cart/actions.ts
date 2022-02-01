import { createAction, props } from "@ngrx/store";
import { MenuItem } from "src/app/models/menu";

export const addItemToCartAction = createAction('[Add item to Cart]', props<MenuItem>());
export const reduceItemFromCartAction = createAction('[Reduce item from Cart]', props<{id: number}>());
export const removeItemFromCartAction = createAction('[Remove item from Cart]', props<{id: number}>());
export const emptyCartAction = createAction('[Empty Cart]');
// export const removeFromCart = createAction('[Auth Logout]');