import {createAction, props} from "@ngrx/store";

export const SET_LOADING_ACTION = '[share state] set loading spinner';

export const setLoadingSpinner = createAction(SET_LOADING_ACTION, props<{state: boolean}>());
