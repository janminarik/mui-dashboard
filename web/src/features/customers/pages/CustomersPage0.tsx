import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Button, debounce, IconButton, Menu, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DataGrid as MuiDataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridRowModel, GridRowSelectionModel, GridSortModel, GridToolbar } from "@mui/x-data-grid";

import { AppDispatch, RootState } from "../../../app/store";
import ErrorBox from "../../../shared/components/ErrorBox";
import Loader from "../../../shared/components/Loader";
import { extractErrorMessage } from "../../../shared/utils/errorUtils";
import { buildFilter, buildSort } from "../../../shared/utils/muiUtils";
import { aggregateApiRequestState } from "../../../shared/utils/rtkUtils";
import { CustomerQueryParams, useDeleteCustomerMutation, useGetCustomersQuery } from "../api/customersApiV2";
import { ROUTES } from "../config/routes";
import { setCustomersFilters, setCustomersPage, setCustomersSelectedItems, setCustomersSortOptions } from "../slices/customersSliceV1";
import { Customer } from "../types/customer";

//obsolete
function CustomersPage0() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [customerCtxMenuEl, setCustomerCtxMenuEl] = useState<HTMLButtonElement | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<GridRowModel<Customer> | null>(null);
  const openCustomerCtxMenu = Boolean(customerCtxMenuEl);

  const { pagination, sortOptions, filters, selectedItems } = useSelector((state: RootState) => state.customersList);

  const queryParams: CustomerQueryParams = useMemo(
    () => ({
      page: pagination.page,
      pageSize: pagination.pageSize,
      sortOptions: sortOptions ? buildSort(sortOptions) : undefined,
      filters: filters ? buildFilter(filters) : undefined,
    }),
    [pagination, sortOptions, filters]
  );

  const customersQuery = useGetCustomersQuery(queryParams);
  const { data } = customersQuery;

  const [deleteCustomer, deleteCustomerResult] = useDeleteCustomerMutation();

  const { isLoading, isError, errors } = aggregateApiRequestState([customersQuery, deleteCustomerResult]);

  const debounceDispatch = useCallback(
    debounce((filters: GridFilterModel) => {
      dispatch(setCustomersFilters(filters));
    }, 500),
    [dispatch]
  );

  const handleFilterChange = useCallback(
    (newModel: GridFilterModel) => {
      debounceDispatch(newModel);
    },
    [debounceDispatch]
  );

  const handlePaginationChange = (newModel: GridPaginationModel) => dispatch(setCustomersPage(newModel));

  const handleSortChange = (newModel: GridSortModel) => dispatch(setCustomersSortOptions(newModel));

  const handleRowSelectionChange = (newModel: GridRowSelectionModel) => dispatch(setCustomersSelectedItems(newModel));

  const handleCustomerMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: GridRowModel<Customer>) => {
    setCustomerCtxMenuEl(event.currentTarget);
    setSelectedCustomer(row);
  };

  const handleCustomerEdit = () => navigate(ROUTES.CUSTOMERS + `/${selectedCustomer?.id}`);

  const handleCustomerDelete = () => {
    deleteCustomer(selectedCustomer?.id!);
    setCustomerCtxMenuEl(null);
  };

  const handleCreateCustomer = () => navigate(ROUTES.CUSTOMER_CREATE);

  const colDef = { flex: 1 };

  const columns: GridColDef[] = [
    { ...colDef, field: "id", headerName: "ID" },
    { ...colDef, field: "firstName", headerName: "First Name" },
    { ...colDef, field: "lastName", headerName: "Last Name" },
    { ...colDef, field: "email", headerName: "Email" },
    { ...colDef, field: "phoneNumber", headerName: "Phone Number" },
    { ...colDef, field: "isVerified", headerName: "Is verified" },
    { ...colDef, field: "createdAt", headerName: "Created At" },
    { ...colDef, field: "updatedAt", headerName: "Updated At" },
    {
      field: "action",
      headerName: "",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(event) => {
              handleCustomerMenuOpen(event, params.row);
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
            open={openCustomerCtxMenu}
            anchorEl={customerCtxMenuEl}
            onClose={() => setCustomerCtxMenuEl(null)}
          >
            <MenuItem onClick={handleCustomerEdit}>Edit</MenuItem>
            <MenuItem onClick={handleCustomerDelete}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  if (!isError && data) {
    return (
      <Grid container flexDirection="row" justifyContent="stretch">
        <Grid>
          <Button onClick={handleCreateCustomer}>Create</Button>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <MuiDataGrid
            loading={isLoading}
            disableRowSelectionOnClick
            checkboxSelection
            slots={{
              toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            columns={columns}
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

export default CustomersPage0;