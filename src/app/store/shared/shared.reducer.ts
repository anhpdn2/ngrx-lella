import {createReducer, on} from "@ngrx/store";
import { setLoadingSpinner } from "./shared.actions";
import {initialState} from "./shared.state";

const _shareReducer = createReducer(initialState,
  on(setLoadingSpinner, (state: any, action: any) => {
    return {
      ...state,
      loading: action.state
    }
  })
)

export function ShareReducer(state: any, action: any) {
  return _shareReducer(state, action);
}
