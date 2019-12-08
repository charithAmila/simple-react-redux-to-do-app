// @flow
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import auth, { type AuthState } from "modules/Auth/store/reducer";
import toDo from '../modules/Task/store/reducer';

export type ApplicationState = {
  auth: AuthState
};

export default (history: History) =>
  combineReducers({
    auth,
    toDo,
    router: connectRouter(history)
  });
