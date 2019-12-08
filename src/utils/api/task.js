import Axios from 'axios';

export const postTask = data =>{
    return Axios.post(`${process.env.REACT_APP_API}/tasks`,data);
};

export const getTasks = () =>{
    return Axios.get(`${process.env.REACT_APP_API}/tasks`);
};

export const deleteTask = id => {
    return Axios.delete(`${process.env.REACT_APP_API}/tasks/${id}`);
};

export const patchTask = (id, data) => {
    return Axios.patch(`${process.env.REACT_APP_API}/tasks/${id}`,data);
};

export const putTask = (data) => {
    return Axios.put(`${process.env.REACT_APP_API}/tasks`,data);
};