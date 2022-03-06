import { Action, createReducer, on } from "@ngrx/store";
import { Branch } from "src/app/models/branch";
import { Cart } from "src/app/models/cart";
import { selectBranchAction } from "./actions";

const localStorageKey = 'branch';
const initialState = null;

const _branchReducer = createReducer(
    (() => {
        if (initialState == null) {
            let branch = localStorage.getItem(localStorageKey);
            // console.log(auth)
            if (branch != null) {
                return JSON.parse(branch);
            }
        }
        if (!initialState) {
            // return null;
        }
        return initialState;
    })(),

    on(selectBranchAction, (state: Branch, action: { branch?: Branch }) => {
        // console.log(action.branch)
        if(action && action.branch){
            localStorage.setItem(localStorageKey, JSON.stringify(action.branch))
            return {...action.branch };
        }
        localStorage.removeItem(localStorageKey)
        return null;
    }),


)

export function branchReducer(state: any, action: Action) {
    return _branchReducer(state, action);
}