import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const itemAdapter = createEntityAdapter();

const itemsSlice = createSlice({
  name: 'items',
  initialState: itemAdapter.getInitialState(),
  reducers: {
    itemAdd: itemAdapter.addOne,
    itemRemove: itemAdapter.removeOne,
    itemsRemove: itemAdapter.removeAll,
    itemUpdate: itemAdapter.updateOne,
    itemsAdd: itemAdapter.addMany,
  },
});

export const {
  itemAdd, itemsRemove, itemRemove, itemUpdate, itemsAdd,
} = itemsSlice.actions;

export const selectors = itemAdapter.getSelectors((state) => state.items);

export default itemsSlice.reducer;
