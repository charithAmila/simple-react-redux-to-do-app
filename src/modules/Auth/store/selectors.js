// @flow
import type { ApplicationState } from "store/reducers";

export const isAuthenticated = (state: ApplicationState) => {
  return false;
};

export const isUserInitiated = (state: ApplicationState) => {
  return true;
};
