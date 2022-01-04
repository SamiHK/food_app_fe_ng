import { createAction, props } from "@ngrx/store";
import { AuthUser } from "src/app/models/auth-user";

export const loginAction = createAction('[Auth Login]', props<AuthUser>());
export const logoutAction = createAction('[Auth Logout]');