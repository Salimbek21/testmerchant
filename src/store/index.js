import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import productsSlice from './products/productSlice'
export const store = configureStore({
  reducer: rootReducer,
  // devTools: REACT_APP_ENABLE_REDUX_DEV_TOOLS === 'true'
});

export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();
