import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GridColumnVisibilityModel, GridFilterModel, GridPaginationModel, GridRowSelectionModel, GridSortModel } from "@mui/x-data-grid";

export interface DataGridState {
    pagination: GridPaginationModel,
    filters?: GridFilterModel;
    sortOptions?: GridSortModel;
    selectedItems?: GridRowSelectionModel;
    columnsVisbility?: GridColumnVisibilityModel;
}

const initialState: DataGridState = {
    pagination: { page: 0, pageSize: 20 }
};

export const createDataGridSlice = (name: string) => {
    return createSlice({
        name: name,
        initialState,
        reducers: {
            setPage(state: DataGridState, action: PayloadAction<GridPaginationModel>) {
                state.pagination = action.payload;
            },
            setFilters(state: DataGridState, action: PayloadAction<GridFilterModel>) {
                state.filters = action.payload;
            },
            setSortOptions(state: DataGridState, action: PayloadAction<GridSortModel>) {
                state.sortOptions = action.payload;
            },
            setSelectedItems(state: DataGridState, action: PayloadAction<GridRowSelectionModel>) {
                state.selectedItems = action.payload;
            }
        },
        extraReducers: (builder) => {
        }
    });

}