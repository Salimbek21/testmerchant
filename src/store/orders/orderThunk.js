import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiOrder} from "../../api/orders";
import {handleError} from "../../api";


export const orderGet = createAsyncThunk(
    'orders/dealers',
    async (params, {rejectWithValue}) => {
        try {
            const response = await apiOrder(params);
            return response?.data;
        } catch (error) {
            handleError(error)
            return rejectWithValue(error)
        }
    }
)