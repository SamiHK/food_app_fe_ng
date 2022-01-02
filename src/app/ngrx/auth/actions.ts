import { createAction, props } from "@ngrx/store";
import { AuthGuard } from "src/app/guards/auth.guard";

export const loginAction = createAction('[Auth Login]', props<AuthGuard>());
export const logoutAction = createAction('[Auth Logout]');