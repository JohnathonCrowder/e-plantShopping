import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Create and configure the Redux store
const store = configureStore({
    // Configure reducers
    reducer: {
        cart: cartReducer,
    },
    // Enable Redux DevTools Extension in development
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;