import { GridColumnVisibilityModel, GridFilterModel, GridPaginationModel, GridRowSelectionModel, GridSortModel } from "@mui/x-data-grid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
            },
            setColumnsVisibility(state: DataGridState, action: PayloadAction<GridColumnVisibilityModel>) {
                state.columnsVisbility = { ...state.columnsVisbility, ...action.payload }
            },
            showAllColumns(state: DataGridState, action: PayloadAction<boolean>) {
                for (const field in state.columnsVisbility) {
                    state.columnsVisbility[field] = action.payload;
                }
            }
        },
        extraReducers: (builder) => {
        }
    });
}

export const dataGridActions = (slice: ReturnType<typeof createDataGridSlice>) => slice.actions;

export interface DataGridSlice {
    name: string;
    actions: ReturnType<typeof dataGridActions>
}