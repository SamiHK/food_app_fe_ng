import { createAction, props } from "@ngrx/store";
import { Branch } from "src/app/models/branch";

export const selectBranchAction = createAction('[Select Branch]', props<{branch?: Branch}>());
