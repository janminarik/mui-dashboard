import { GridColumnVisibilityModel, GridFilterModel, GridPaginationModel, GridRowSelectionModel, GridSortModel } from "@mui/x-data-grid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DataGridState } from "../../../shared/slices/datagridSlice";

interface CustomersState extends DataGridState {}

const initialState: CustomersState = {
  columnsVisbility: {
    createdAt: true,
    email: true,
    firstName: true,
    id: true,
    isVerified: true,
    lastName: true,
    phoneNumber: true,
    updatedAt: true,
  },
  pagination: { page: 0, pageSize: 20 },
};

export const customersSlice = createSlice({
  extraReducers: (builder) => {},
  initialState,
  name: "customersList",
  reducers: {
    setColumnsVisibility(state: CustomersState, action: PayloadAction<GridColumnVisibilityModel>) {
      state.columnsVisbility = { ...state.columnsVisbility, ...action.payload };
    },
    setFilters(state: CustomersState, action: PayloadAction<GridFilterModel>) {
      state.filters = action.payload;
    },
    setPage(state: CustomersState, action: PayloadAction<GridPaginationModel>) {
      state.pagination = action.payload;
    },
    setSelectedItems(state: CustomersState, action: PayloadAction<GridRowSelectionModel>) {
      state.selectedItems = action.payload;
    },
    setSortOptions(state: CustomersState, action: PayloadAction<GridSortModel>) {
      state.sortOptions = action.payload;
    },
    showAllColumns(state: CustomersState, action: PayloadAction<boolean>) {
      for (const field in state.columnsVisbility) {
        state.columnsVisbility[field] = action.payload;
      }
    },
  },
});

export const {
  setColumnsVisibility: setCustomersColumnsVisibility,
  setFilters: setCustomersFilters,
  setPage: setCustomersPage,
  setSelectedItems: setCustomersSelectedItems,
  setSortOptions: setCustomersSortOptions,
  showAllColumns: showAllCustomersColumns,
} = customersSlice.actions;

export const customersReducer = customersSlice.reducer;
