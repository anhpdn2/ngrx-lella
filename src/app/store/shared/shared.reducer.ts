import {createReducer, on} from "@ngrx/store";
import {setErrorMessage, setLoadingSpinner} from "./shared.actions";
import {initialState} from "./shared.state";

const _shareReducer = createReducer(initialState,
  on(setLoadingSpinner, (state: any, action: any) => {
    return {
      ...state,
      showLoading: action.state
    }
  }),
  on(setErrorMessage, (state: any, action: any) => {
    return {
      ...state,
      errorMessage: action.message
    }
  })
)

export function ShareReducer(state: any, action: any) {
  return _shareReducer(state, action);
}
