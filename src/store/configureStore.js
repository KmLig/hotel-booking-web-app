import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import hotelReducer from './hotels';
import authReducer from './auth';
import api from './middleware/api';
import error from './middleware/error';


const store = configureStore({
    reducer: {
        hotels: hotelReducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), api, error]
});

export default store;
