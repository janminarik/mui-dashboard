import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, debounce, IconButton, Menu, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  GridColDef,
  GridColumnVisibilityModel,
  GridFilterModel,
  GridPaginationModel,
  GridRowModel,
  GridRowSelectionModel,
  GridSortModel,
  DataGrid as MuiDataGrid,
} from "@mui/x-data-grid";
import { useCallback, useMemo, useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch } from "../../app/store";
import { extractErrorMessage } from "../utils/errorUtils";
import { buildFilter, buildSort } from "../utils/muiUtils";
import { aggregateApiRequestState, QueryParams } from "../utils/rtkUtils";
import ErrorBox from "./ErrorBox";
import Loader from "./Loader";

export interface DataGridProps<TEntity> {
  columns: GridColDef[];
  columnsVisbility?: GridColumnVisibilityModel;
  createEntityRoute: string;
  editEntityRoute: string;
  filters?: GridFilterModel;
  pagination: GridPaginationModel;

  selectedItems?: GridRowSelectionModel;
  setColumnsVisibility: (columnsVisibility: GridColumnVisibilityModel) => void;
  setFilters: (filters: GridFilterModel) => void;
  setPagination: (pagination: GridPaginationModel) => void;
  setSelectedItems: (selectedItems: GridRowSelectionModel) => void;

  setSortOptions: (sortOptions: GridSortModel) => void;
  showAllColumns: (visible: boolean) => void;
  showContextMenu?: boolean;
  showDeleteInContextMenu?: boolean;
  showEditInContexMenu?: boolean;
  sortOptions?: GridSortModel;
  useDeleteEntity: any; //todo: fix type
  useGetEntities: (params: QueryParams<TEntity>) => {
    data?: { items: TEntity[]; totalCount: number };
    error?: unknown;
    isError: boolean;
    isFetching: boolean;
    isLoading: boolean;
  };
}

function DataGrid<TEntity extends { id: string }>({
  columns,
  columnsVisbility,
  createEntityRoute,
  editEntityRoute,
  filters,
  pagination,
  selectedItems,
  setColumnsVisibility,
  setFilters,
  setPagination,
  setSelectedItems,
  setSortOptions,
  showAllColumns,
  showContextMenu,
  showDeleteInContextMenu,
  showEditInContexMenu,
  sortOptions,
  useDeleteEntity,
  useGetEntities,
}: DataGridProps<TEntity>) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [contextMenu, setContextMenu] = useState<HTMLButtonElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<GridRowModel<TEntity> | null>(null);
  const openContexMenu = Boolean(contextMenu);

  const queryParams: QueryParams<TEntity> = useMemo(
    () => ({
      filters: filters ? (buildFilter(filters) as Partial<Record<keyof TEntity, any>>) : undefined,
      page: pagination.page,
      pageSize: pagination.pageSize,
      sortOptions: sortOptions ? buildSort(sortOptions) : undefined,
    }),
    [pagination, sortOptions, filters],
  );

  const customersQuery = useGetEntities(queryParams);
  const { data } = customersQuery;

  const [deleteCustomer, deleteCustomerResult] = useDeleteEntity();

  const { errors, isError, isLoading } = aggregateApiRequestState([customersQuery, deleteCustomerResult]);

  const debounceDispatch = useCallback(
    debounce((filters: GridFilterModel) => {
      setFilters(filters);
    }, 500),
    [dispatch],
  );

  const handleFilterChange = useCallback(
    (newModel: GridFilterModel) => {
      debounceDispatch(newModel);
    },
    [debounceDispatch],
  );

  const handlePaginationChange = (newModel: GridPaginationModel) => setPagination(newModel);

  const handleSortChange = (newModel: GridSortModel) => setSortOptions(newModel);

  const handleRowSelectionChange = (newModel: GridRowSelectionModel) => setSelectedItems(newModel);

  const handleVisibilityModelChange = (newModel: GridColumnVisibilityModel) => {
    if (Object.keys(newModel).length === 0) {
      showAllColumns(true);
    } else {
      setColumnsVisibility(newModel);
    }
  };

  const handleContexMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: GridRowModel<TEntity>) => {
    setContextMenu(event.currentTarget);
    setSelectedItem(row);
  };

  const handleEntityEdit = () => navigate(editEntityRoute + `/${selectedItem?.id}`);

  const handleEntityCreate = () => navigate(createEntityRoute);

  const handleEntityDelete = () => {
    deleteCustomer(selectedItem?.id as unknown as { id: string });
    setContextMenu(null);
  };

  const contextColumn = {
    field: "action",
    filterable: false,
    headerName: "",
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
          anchorEl={contextMenu}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom",
          }}
          onClose={() => setContextMenu(null)}
          open={openContexMenu}
          slotProps={{
            paper: {
              elevation: 1,
              sx: {
                minWidth: 120,
              },
            },
          }}
          transformOrigin={{
            horizontal: "right",
            vertical: "top",
          }}
        >
          {showEditInContexMenu && <MenuItem onClick={handleEntityEdit}>Edit</MenuItem>}
          {showDeleteInContextMenu && <MenuItem onClick={handleEntityDelete}>Delete</MenuItem>}
        </Menu>
      </>
    ),
    sortable: false,
  };

  if (!isError && data) {
    return (
      <Grid container flexDirection="column" justifyContent="stretch" size={{ xs: 12 }}>
        <Grid container flexDirection="row" justifyContent="stretch" pt={3} size={{ xs: 12 }}>
          <Grid container justifyContent="flex-end" mx={4} size={{ xs: 12 }}>
            <Button onClick={handleEntityCreate}>Create</Button>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <MuiDataGrid
            checkboxSelection
            columns={showContextMenu ? [...columns, contextColumn] : columns}
            columnVisibilityModel={columnsVisbility}
            // slots={{
            //   toolbar: GridToolbar,
            // }}
            // slotProps={{
            //   toolbar: {
            //     showQuickFilter: true,
            //   },
            // }}

            disableRowSelectionOnClick
            filterMode="server"
            filterModel={filters}
            loading={isLoading}
            onColumnVisibilityModelChange={handleVisibilityModelChange}
            onFilterModelChange={handleFilterChange}
            onPaginationModelChange={handlePaginationChange}
            onRowSelectionModelChange={handleRowSelectionChange}
            onSortModelChange={handleSortChange}
            pageSizeOptions={[5, 10, 20, 100]}
            paginationMode="server"
            paginationModel={pagination}
            rowCount={data?.totalCount ? data.totalCount : 0}
            rows={data.items || []}
            rowSelectionModel={selectedItems}
            sortingMode="server"
            sx={{ m: 4 }}
          ></MuiDataGrid>
        </Grid>
      </Grid>
    );
  } else if (isError) {
    return (
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <ErrorBox message={errors.length > 0 ? errors.map((error) => extractErrorMessage(error)).join("\n") : undefined}></ErrorBox>
      </Box>
    );
  } else if (!isError && isLoading) {
    return (
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <Loader message="Loading customers..." />
      </Box>
    );
  }
}

export default DataGrid;
