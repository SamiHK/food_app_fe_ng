import { Action, createReducer, on } from "@ngrx/store";
import { AuthGuard } from "src/app/guards/auth.guard";
import { loginAction, logoutAction } from "./actions";

export const authReducerKey = 'authReducer';

const initialState = null;

const _authReducer = createReducer(
    (()=> {
        if(initialState == null){
            let auth = localStorage.getItem('auth');
            // console.log(auth)
            if(auth != null){
                return JSON.parse(auth);
            }
        }
        return initialState;
    })(),
    on(loginAction, (state, action) => {
        // console.log(state);
        // console.log(action);
        localStorage.setItem('auth', JSON.stringify(action))
        return action;
        // state.username = action.username;
    }),
    on(logoutAction, () => {
        localStorage.removeItem('auth');
        return initialState;
    })
)

export function authReducer(state: any, action: Action) {
    return 	_authReducer(state, action);
}