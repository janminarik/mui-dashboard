import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { useCallback, useMemo, useState } from "react";
import {
  DataGrid as MuiDataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRowModel,
  GridRowSelectionModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { buildFilter, buildSort } from "../utils/muiUtils";
import { aggregateApiRequestState, QueryParams } from "../utils/rtkUtils";
import {
  Box,
  Button,
  debounce,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ErrorBox from "./ErrorBox";
import { extractErrorMessage } from "../utils/errorUtils";
import Loader from "./Loader";

export interface DataGridProps<TEntity> {
  columns: GridColDef[];
  showContextMenu?: boolean;
  showDeleteInContextMenu?: boolean;
  showEditInContexMenu?: boolean;
  createEntityRoute: string;
  editEntityRoute: string;
  setPagination: (pagination: GridPaginationModel) => void;
  setFilters: (filters: GridFilterModel) => void;
  setSortOptions: (sortOptions: GridSortModel) => void;
  setSelectedItems: (selectedItems: GridRowSelectionModel) => void;
  useGetEntities: (params: QueryParams<TEntity>) => {
    data?: { items: TEntity[]; totalCount: number };
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    error?: unknown;
  };
  useDeleteEntity: any; //todo: fix type
}

function DataGrid<TEntity extends { id: string }>({
  columns,
  showContextMenu,
  showEditInContexMenu,
  showDeleteInContextMenu,
  setPagination,
  setFilters,
  setSelectedItems,
  setSortOptions,
  createEntityRoute,
  editEntityRoute,
  useGetEntities,
  useDeleteEntity,
}: DataGridProps<TEntity>) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [contextMenu, setContextMenu] = useState<HTMLButtonElement | null>(
    null
  );
  const [selectedItem, setSelectedItem] =
    useState<GridRowModel<TEntity> | null>(null);
  const openContexMenu = Boolean(contextMenu);
  const { pagination, sortOptions, filters, selectedItems } = useSelector(
    (state: RootState) => state.customersList
  );

  const queryParams: QueryParams<TEntity> = useMemo(
    () => ({
      page: pagination.page,
      pageSize: pagination.pageSize,
      sortOptions: sortOptions ? buildSort(sortOptions) : undefined,
      filters: filters
        ? (buildFilter(filters) as Partial<Record<keyof TEntity, any>>)
        : undefined,
    }),
    [pagination, sortOptions, filters]
  );

  const customersQuery = useGetEntities(queryParams);
  const { data } = customersQuery;

  const [deleteCustomer, deleteCustomerResult] = useDeleteEntity();

  const { isLoading, isError, errors } = aggregateApiRequestState([
    customersQuery,
    deleteCustomerResult,
  ]);

  const debounceDispatch = useCallback(
    debounce((filters: GridFilterModel) => {
      setFilters(filters);
    }, 500),
    [dispatch]
  );

  const handleFilterChange = useCallback(
    (newModel: GridFilterModel) => {
      debounceDispatch(newModel);
    },
    [debounceDispatch]
  );

  const handlePaginationChange = (newModel: GridPaginationModel) =>
    setPagination(newModel);

  const handleSortChange = (newModel: GridSortModel) =>
    setSortOptions(newModel);

  const handleRowSelectionChange = (newModel: GridRowSelectionModel) =>
    setSelectedItems(newModel);

  const handleContexMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: GridRowModel<TEntity>
  ) => {
    setContextMenu(event.currentTarget);
    setSelectedItem(row);
  };

  const handleEntityEdit = () =>
    navigate(editEntityRoute + `/${selectedItem?.id}`);

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
          {showEditInContexMenu && (
            <MenuItem onClick={handleEntityEdit}>Edit</MenuItem>
          )}
          {showDeleteInContextMenu && (
            <MenuItem onClick={handleEntityDelete}>Delete</MenuItem>
          )}
        </Menu>
      </>
    ),
  };

  if (!isError && data) {
    return (
      <Grid container flexDirection="row" justifyContent="stretch">
        <Grid>
          <Button onClick={handleEntityCreate}>Create</Button>
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
            columns={showContextMenu ? [...columns, contextColumn] : columns}
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
        <ErrorBox
          message={
            errors.length > 0
              ? errors.map((error) => extractErrorMessage(error)).join("\n")
              : undefined
          }
        ></ErrorBox>
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

export default DataGrid;
