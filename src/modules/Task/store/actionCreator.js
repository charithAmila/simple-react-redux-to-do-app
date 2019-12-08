import { getTasks } from 'utils/api/task';
import { setTasks } from 'modules/Task/store/action';

export const fetchTasks = () => dispatch => {
    getTasks().then(res=>{
        dispatch(setTasks(res.data));
    }).catch(e=>{
        console.log('e',e);
    });
};