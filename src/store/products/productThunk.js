import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiProduct} from "../../api/product";
import {handleError} from "../../api";


export const productsGet = createAsyncThunk(
    'products/dealers',
    async (params, {rejectWithValue}) => {
        try {
            const response = await apiProduct(params);
            return response?.data;
        } catch (error) {
            handleError(error)
            return rejectWithValue(error)
        }
    }
)