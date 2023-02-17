import { combineReducers } from "@reduxjs/toolkit";
// import {  as productsSlice } from "./products/productSlice";
import productsSlice from './products/productSlice'
import orderSlice from './orders/orderSlice'

export const rootReducer = combineReducers({
  products: productsSlice,
  orders: orderSlice,
});
