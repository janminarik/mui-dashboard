import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer } from "../types/customer";
import { Filters, SortOptions } from "../../../shared/utils/apiUtil";
import { GridFilterModel, GridPaginationModel, GridRowModel, GridRowSelectionModel, GridSortModel } from "@mui/x-data-grid";

interface CustomersListState {
    pagination: GridPaginationModel,
    filters?: GridFilterModel;
    sortOptions?: GridSortModel;
    selectedItems?: GridRowSelectionModel;
}

const initialState: CustomersListState = {
    pagination: { page: 0, pageSize: 20 }
};

export const CustomersListSlice = createSlice({
    name: "customersList",
    initialState,
    reducers: {
        setPage(state: CustomersListState, action: PayloadAction<GridPaginationModel>) {
            state.pagination = action.payload;
        },
        setFilters(state: CustomersListState, action: PayloadAction<GridFilterModel>) {
            state.filters = action.payload;
        },
        setSortOptions(state: CustomersListState, action: PayloadAction<GridSortModel>) {
            state.sortOptions = action.payload;
        },
        setSelectedItems(state: CustomersListState, action: PayloadAction<GridRowSelectionModel>) {
            state.selectedItems = action.payload;
        }
    },
    extraReducers: (builder) => {
    }
});

export const { setPage, setFilters, setSortOptions, setSelectedItems } = CustomersListSlice.actions;
export const customersListReducer = CustomersListSlice.reducer;