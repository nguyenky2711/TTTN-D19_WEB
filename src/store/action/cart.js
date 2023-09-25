import { createAsyncThunk } from '@reduxjs/toolkit';
import cart from '../api/cart';
const {
    addProductToCart,
    deleteProductFromCart,
    getCart,
    updateQuantity,
} = cart

export const addProductToCartThunk = createAsyncThunk(
    'cart/addProductToCart',
    async (data) => {
        const res = await addProductToCart(data);
        return res;
    }
);
export const getCartThunk = createAsyncThunk(
    'cart/getCart',
    async (data) => {
        const res = await getCart(data);
        return res;
    }
);
export const deleteProductFromCartThunk = createAsyncThunk(
    'cart/deleteProductFromCart',
    async (data) => {
        const res = await deleteProductFromCart(data);
        return res;
    }
);
export const updateQuantityThunk = createAsyncThunk(
    'cart/updateQuantity',
    async (data) => {
        const res = await updateQuantity(data);
        return res;
    }
);