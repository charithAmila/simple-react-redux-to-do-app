import {TASK, TASKS} from './actionTypes';

const initialState = {
  task: {},
  tasks:[]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TASK:
      return { ...state, task: action.payload };
    case TASKS:
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
}