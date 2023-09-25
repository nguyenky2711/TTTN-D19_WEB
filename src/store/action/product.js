import { createAsyncThunk } from '@reduxjs/toolkit';
import product from '../api/product';
import axios from "axios";
const {
    getListProduct,
    createProduct,
    getProductById,
    getProductByItemId,
    createItem,
    updateItem,
    deleteItem,
    createImport,
    getProductsForImport,
    updatePrice,
    updateSize,
} = product

export const createProductThunk = createAsyncThunk(
    'product/createProduct',
    async (data) => {
        const res = await createProduct(data);
        return res;
    }
);
export const getListProductThunk = createAsyncThunk(
    'product/getListProduct',
    async (data) => {
        const res = await getListProduct(data);
        return res;
    }
);
export const getProductByIdThunk = createAsyncThunk(
    'product/getProductById',
    async (data) => {
        const res = await getProductById(data);
        return res;
    }
);
export const getProductsForImportThunk = createAsyncThunk(
    'product/getProductById',
    async (data) => {
        const res = await getProductsForImport(data);
        return res;
    }
);
export const getProductByItemIdThunk = createAsyncThunk(
    'product/getProductByItemId',
    async (data) => {
        const res = await getProductByItemId(data);
        return res;
    }
);
export const updateItemThunk = createAsyncThunk(
    'product/updateItem',
    async (data) => {
        const res = await updateItem(data);
        return res;
    }
);
export const deleteItemThunk = createAsyncThunk(
    'product/deleteItem',
    async (data) => {
        const res = await deleteItem(data);
        return res;
    }
);
export const createImportThunk = createAsyncThunk(
    'product/createImport',
    async (data) => {
        const res = await createImport(data);
        return res;
    }
);
export const updatePriceThunk = createAsyncThunk(
    'product/updatePrice',
    async (data) => {
        const res = await updatePrice(data);
        return res;
    }
);
export const updateSizeThunk = createAsyncThunk(
    'product/updateSize',
    async (data) => {
        const res = await updateSize(data);
        return res;
    }
);
export const createItemThunk = createAsyncThunk(
    'product/createItem',
    async (data) => {
        console.log(JSON.stringify(data))
        try {

            const response = await axios.post('http://localhost:4000/api/items', data, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the correct Content-Type header
                    // Add any other headers you need
                },
            });

            return response.data;
        } catch (error) {
            // Handle errors
            console.error('Error creating item:', error);
            throw error;
        }
    }
);