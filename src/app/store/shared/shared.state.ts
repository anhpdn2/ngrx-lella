export interface SharedState {
  showLoading: boolean;
  errorMessage: string;
}

export const initialState = {
  showLoading: false,
  errorMessage: ''
}
