import axios from 'axios';
import { apiCallBegan } from '../api';


const api = ({ dispatch }) => next => async action => {
    if (action.type !== apiCallBegan.type) {
        return next(action);
    }

    const { url, data, method, onStart, onSuccess, onError } = action.payload;
    if (onStart) {
        dispatch({ type: onStart });
    }
    try {
        const response = await axios.request({
            baseURL: 'http://localhost:5000/api',
            url: url,
            method: method,
            data: data
        });
        dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
        if (onError) {
            dispatch({ type: onError, payload: { error: error.message } });
        }
        dispatch({ type: 'showError', payload: { error: error.message } });
    }
};

export default api;