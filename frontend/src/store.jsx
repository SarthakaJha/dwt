//stores all the states

import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
    reducer :{
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true
});

export default store