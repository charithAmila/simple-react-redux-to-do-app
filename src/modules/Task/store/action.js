import {TASK, TASKS} from './actionTypes';

export const setTasks = payload => dispatch => {
    return dispatch({
        type: TASKS,
        payload
    });
};