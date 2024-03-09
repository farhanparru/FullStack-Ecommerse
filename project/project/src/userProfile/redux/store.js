//User

import { configureStore } from '@reduxjs/toolkit'
import addressReducer from '../redux/reducer/user/AddressSlice'; 

export const store = configureStore({
    reducer: {
        address: addressReducer // Make sure the reducer key matches the one used in your components
    }
});