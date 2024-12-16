import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GridColumnVisibilityModel, GridFilterModel, GridPaginationModel, GridRowSelectionModel, GridSortModel } from "@mui/x-data-grid";
import { DataGridState } from "../../../shared/slices/datagridSlice";
import { TRANSLATIONS_DEFAULT_NAMESPACE } from "../../../i18n/config";

//version 2
// const customersSlice2 = createDataGridSlice("customersList");
// export const customersReducer2 = customersSlice2.reducer;


//version 1
interface CustomersState extends DataGridState {
}

const initialState: CustomersState = {
    pagination: { page: 0, pageSize: 20 },
    columnsVisbility: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
    }
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
        },
        setColumnsVisibility(state: CustomersState, action: PayloadAction<GridColumnVisibilityModel>) {
            state.columnsVisbility = { ...state.columnsVisbility, ...action.payload }
        },
        showAllColumns(state: CustomersState, action: PayloadAction<boolean>) {
            for (const field in state.columnsVisbility) {
                state.columnsVisbility[field] = action.payload;
            }
        }

    },
    extraReducers: (builder) => {
    }
});

export const { setPage: setCustomersPage,
    setFilters: setCustomersFilters,
    setSortOptions: setCustomersSortOptions,
    setSelectedItems: setCustomersSelectedItems,
    setColumnsVisibility: setCustomersColumnsVisibility,
    showAllColumns: showAllCustomersColumns } = customersSlice.actions;


export const customersReducer = customersSlice.reducer;