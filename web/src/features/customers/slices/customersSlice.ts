import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GridFilterModel, GridPaginationModel, GridRowSelectionModel, GridSortModel } from "@mui/x-data-grid";
import { DataGridState } from "../../../shared/slices/datagridSlice";

interface CustomersState extends DataGridState {
}

const initialState: CustomersState = {
    pagination: { page: 0, pageSize: 20 }
};

export const customersSlice = createSlice({
    name: "customersList",
    initialState,
    reducers: {
        setPage(state: CustomersState, action: PayloadAction<GridPaginationModel>) {
            state.pagination = action.payload;
        },
        setFilters(state: CustomersState, action: PayloadAction<GridFilterModel>) {
            state.filters = action.payload;
        },
        setSortOptions(state: CustomersState, action: PayloadAction<GridSortModel>) {
            state.sortOptions = action.payload;
        },
        setSelectedItems(state: CustomersState, action: PayloadAction<GridRowSelectionModel>) {
            state.selectedItems = action.payload;
        }
    },
    extraReducers: (builder) => {
    }
});

export const { setPage: setCustomersPage,
    setFilters: setCustomersFilters,
    setSortOptions: setCustomersSortOptions,
    setSelectedItems: setCustomersSelectedItems } = customersSlice.actions;
export const customersReducer = customersSlice.reducer;