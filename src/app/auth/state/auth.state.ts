import { User } from "src/app/models/User.model";

export const AUTH_STATE_NAME = 'auth';
export interface AuthState {
  user: User | null | undefined;
}

export const initialState: AuthState = {
  user: null
};
