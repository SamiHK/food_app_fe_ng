import { createReducer, on } from "@ngrx/store";
import { loginAction, logoutAction, updateAuthAction } from "./actions";

export const key = 'authReducer';

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
    on(updateAuthAction, (state, action) => {
        // console.log(state);
        // console.log(action);
        return action;
    }),
    on(logoutAction, state => {
        localStorage.removeItem('auth');
        return null;
    })
)

export function authReducer(state, action) {
    return _authReducer(state, action);
}