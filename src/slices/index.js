import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemsSlice.js';

export default configureStore({
  reducer: {
    items: itemsReducer,
  },
});
