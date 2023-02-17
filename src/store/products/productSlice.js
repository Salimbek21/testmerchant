import {createSlice} from "@reduxjs/toolkit";
import {productsGet} from "./productThunk";


const initialState = {
    productsAll: [],
    meta: {},
    status: null,
    error: null,
}
const setError = (state, action) => {
    state.status = 'rejected'
    state.error = action?.payload
}
const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: {
        [productsGet.pending]: (state) => {
            state.status = 'pending'
        },
        [productsGet.fulfilled]: (state, action) => {
            state.status = 'fulfilled'  
            state.productsAll = action.payload.data
            state.meta = action.payload.meta
        },
        [productsGet.rejected]: setError,
    }
})
export default productsSlice.reducer;