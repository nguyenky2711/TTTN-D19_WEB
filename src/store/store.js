import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from "./slice/authSlice";
import productSlice from './slice/productSlice';
import cartSlice from './slice/cartSlice';
import orderSlice from './slice/orderSlice';
import manageSlice from './slice/manage';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    auth: authSlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
    manage: manageSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)