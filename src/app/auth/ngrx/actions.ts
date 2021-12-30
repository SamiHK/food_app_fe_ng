import { createAction, props } from "@ngrx/store";
import { AuthUser } from "../../models/auth-user";

export const loginAction = createAction('[Authentication] login', props<AuthUser>());
export const updateAuthAction = createAction('[Authentication] updateAuth', props<AuthUser>());
export const logoutAction = createAction('[Authentication] logout');