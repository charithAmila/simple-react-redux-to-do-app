// @flow
import { type Action } from "shared/types/ReducerAction";

export type AuthState = {
  loading: boolean,
  errors: null | string
};

const initialState: AuthState = {
  loading: false,
  errors: null
};

export default (
  state: AuthState = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    default:
      return state;
  }
};
