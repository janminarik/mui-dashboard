import { useCallback, useMemo, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, debounce, IconButton, Menu, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid as MuiDataGrid, GridColDef, GridColumnVisibilityModel,GridFilterModel, GridPaginationModel, GridRowModel, GridRowSelectionModel, GridSortModel } from "@mui/x-data-grid";

import { AppDispatch, RootState } from "../../app/store";
import { DataGridSlice, DataGridState } from "../slices/datagridSlice";
import { extractErrorMessage } from "../utils/errorUtils";
import { buildFilter, buildSort } from "../utils/muiUtils";
import { aggregateApiRequestState, QueryParams } from "../utils/rtkUtils";
import ErrorBox from "./ErrorBox";
import Loader from "./Loader";

type DataGridRowContextMenuConfig = {
  show?: boolean;
  showDelete?: boolean;
  showEdit?: boolean;
};

export interface DataGridWrapperProps {
  columns: GridColDef[];
  createEntityRoute: string;
  editEntityRoute: string;
  slice: DataGridSlice;
  api: any;
  rowContextMenu: DataGridRowContextMenuConfig;
}

function DataGridWrapper<TEntity extends { id: string }>({ columns, createEntityRoute, editEntityRoute, slice, api, rowContextMenu }: DataGridWrapperProps) {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [contextMenu, setContextMenu] = useState<HTMLButtonElement | null>(null);

  const [selectedItem, setSelectedItem] = useState<GridRowModel | null>(null);

  const openContexMenu = Boolean(contextMenu);

  const { pagination, filters, sortOptions, selectedItems, columnsVisbility } = useSelector((state: RootState) => state[slice.name] as DataGridState);

  const { setFilters, setPage, setSelectedItems, setSortOptions, setColumnsVisibility, showAllColumns } = slice.actions;

  const queryParams: QueryParams<TEntity> = useMemo(
    () => ({
      page: pagination.page,
      pageSize: pagination.pageSize,
      sortOptions: sortOptions ? buildSort(sortOptions) : undefined,
      filters: filters ? (buildFilter(filters) as Partial<Record<keyof TEntity, any>>) : undefined,
    }),
    [pagination, sortOptions, filters]
  );

  const { useGetEntitiesQuery, useDeleteEntityMutation } = api;

  const customersQuery = useGetEntitiesQuery(queryParams);

  const { data } = customersQuery;

  const [deleteCustomer, deleteCustomerResult] = useDeleteEntityMutation();

  const { isLoading, isError, errors } = aggregateApiRequestState([customersQuery, deleteCustomerResult]);

  const handlePaginationChange = (newModel: GridPaginationModel) => dispatch(setPage(newModel));

  const handleSortChange = (newModel: GridSortModel) => dispatch(setSortOptions(newModel));

  const handleRowSelectionChange = (newModel: GridRowSelectionModel) => dispatch(setSelectedItems(newModel));

  const handleContexMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: GridRowModel<TEntity>) => {
    setContextMenu(event.currentTarget);
    setSelectedItem(row);
  };
  const handleVisibilityModelChange = (newModel: GridColumnVisibilityModel) => {
    if (Object.keys(newModel).length === 0) {
      dispatch(showAllColumns(true));
    } else {
      dispatch(setColumnsVisibility(newModel));
    }
  };

  const debounceDispatch = useCallback(
    debounce((filters: GridFilterModel) => {
      dispatch(setFilters(filters));
    }, 500),
    [dispatch]
  );

  const handleFilterChange = useCallback(
    (newModel: GridFilterModel) => {
      debounceDispatch(newModel);
    },
    [debounceDispatch]
  );

  const handleEntityEdit = () => navigate(editEntityRoute + `/${selectedItem?.id}`);

  const handleEntityCreate = () => navigate(createEntityRoute);

  const handleEntityDelete = () => {
    deleteCustomer(selectedItem?.id as unknown as { id: string });
    setContextMenu(null);
  };

  const contextColumn = {
    field: "action",
    headerName: "",
    sortable: false,
    filterable: false,
    renderCell: (params: any) => (
      <>
        <IconButton
          onClick={(event) => {
            handleContexMenuOpen(event, params.row);
          }}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: {
                minWidth: 120,
              },
              elevation: 1,
            },
          }}
          open={openContexMenu}
          anchorEl={contextMenu}
          onClose={() => setContextMenu(null)}
        >
          {rowContextMenu.showEdit && <MenuItem onClick={handleEntityEdit}>Edit</MenuItem>}
          {rowContextMenu.showDelete && <MenuItem onClick={handleEntityDelete}>Delete</MenuItem>}
        </Menu>
      </>
    ),
  };

  if (!isError && data) {
    return (
      <Grid size={{ xs: 12 }} container justifyContent="stretch" flexDirection="column">
        <Grid container flexDirection="row" justifyContent="stretch" pt={3} size={{ xs: 12 }}>
          <Grid container mx={4} justifyContent="flex-end" size={{ xs: 12 }}>
            <Button onClick={handleEntityCreate}>Create</Button>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <MuiDataGrid
            loading={isLoading}
            disableRowSelectionOnClick
            checkboxSelection
            // slots={{
            //   toolbar: GridToolbar,
            // }}
            // slotProps={{
            //   toolbar: {
            //     showQuickFilter: true,
            //   },
            // }}

            columns={rowContextMenu ? [...columns, contextColumn] : columns}
            rowCount={data?.totalCount ? data.totalCount : 0}
            pageSizeOptions={[5, 10, 20, 100]}
            rows={data.items || []}
            paginationMode="server"
            paginationModel={pagination}
            filterMode="server"
            sortingMode="server"
            filterModel={filters}
            onFilterModelChange={handleFilterChange}
            onPaginationModelChange={handlePaginationChange}
            onRowSelectionModelChange={handleRowSelectionChange}
            onSortModelChange={handleSortChange}
            rowSelectionModel={selectedItems}
            columnVisibilityModel={columnsVisbility}
            onColumnVisibilityModelChange={handleVisibilityModelChange}
            sx={{ m: 4 }}
          ></MuiDataGrid>
        </Grid>
      </Grid>
    );
  } else if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorBox message={errors.length > 0 ? errors.map((error) => extractErrorMessage(error)).join("\n") : undefined}></ErrorBox>
      </Box>
    );
  } else if (!isError && isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader message="Loading customers..." />
      </Box>
    );
  }
}

export default DataGridWrapper;
