import {createSlice} from "@reduxjs/toolkit";
import {orderGet} from "./orderThunk";

const initialState = {
    orders: [],
    meta: {},
    status: null,
    error: null,
}
const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action?.payload
}
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    extraReducers: {
        [orderGet.pending]: (state) => {
            state.status = 'pending'
        },
        [orderGet.fulfilled]: (state, action) => {
            state.status = 'fulfilled'  
            state.orders = action.payload.data
            state.meta = action.payload.meta
        },
        
        [orderGet.rejected]: setError,
    }
})
export default orderSlice.reducer;