import {
  useDeleteCustomerMutation,
  useGetCustomersQuery,
} from "../api/customersApi";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRowModel,
  GridRowSelectionModel,
  GridSortModel,
  GridToolbar,
} from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Customer } from "../types/customer";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../config/routes";
import Loader from "../../../shared/components/Loader";
import ErrorBox from "../../../shared/components/ErrorBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { extractErrorDetails } from "../../../shared/utils/errorUtils";
import { Filters, SortOptions } from "../../../shared/utils/apiUtil";
import { buildFilter } from "../../../shared/utils/muiUtil";

function CustomersPage() {
  const navigate = useNavigate();

  const [customerCtxMenuEl, setCustomerCtxMenuEl] =
    useState<HTMLButtonElement | null>(null);

  const openCustomerCtxMenu = Boolean(customerCtxMenuEl);

  const [selectedCustomer, setSelectedCustomer] =
    useState<GridRowModel<Customer> | null>(null);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 20,
  });

  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const [debouncedFilterModel, setDebouncedFilterMode] =
    useState<GridFilterModel>({
      items: [],
    });

  // const [requestParams, setRequestParams] = useState<DataGridRequestParams>({});

  const [, cancel] = useDebounce(
    () => {
      setDebouncedFilterMode(filterModel);
    },
    300,
    [filterModel]
  );

  //RTK queries and mutations
  // const skipQuery = requestParams.pagination === undefined;

  const filters: Filters<Customer> = buildFilter(filterModel);

  const sortOptions: SortOptions<Customer> = sortModel.map((model) => ({
    field: model.field as keyof Customer,
    direction: model.sort as "asc" | "desc",
  }));

  console.log("sort----------", sortOptions);

  const {
    data,
    isLoading: isGetCustomersLoading,
    isFetching: isGetCustomersFetching,
    isError: isGetCustomersError,
    error: getCustomersError,
  } = useGetCustomersQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sortOptions: sortOptions,
    filters: filters,
  });

  console.log(data);

  const [deleteCustomer, result] = useDeleteCustomerMutation();
  const {
    isLoading: isDeleteCustomerLoading,
    isError: isDeleteCustomerError,
    error: deleteCustomerError,
  } = result;

  const loading =
    isGetCustomersLoading || isGetCustomersFetching || isDeleteCustomerLoading;
  const isError = isGetCustomersError || isDeleteCustomerError;
  const rtkError = getCustomersError || deleteCustomerError;
  const error = extractErrorDetails(rtkError);

  console.log("is error", isError);
  console.log("error", rtkError);

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    const filtredColumns = debouncedFilterModel.items
      .filter((filter) => filter.value != undefined)
      .map((item) => ({
        column: item.field,
        operator: item.operator,
        value: item.value,
      }));

    // setRequestParams((prev) => ({
    //   pagination: {
    //     page: paginationModel.page + 1,
    //     limit: paginationModel.pageSize,
    //   },
    //   columnFilters: filtredColumns,
    // }));
  }, [paginationModel, debouncedFilterModel]);

  const handlePaginationChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
  };

  const handleFilterChange = (newModel: GridFilterModel) => {
    setFilterModel(newModel);
  };

  const handleSortChange = (newModel: GridSortModel) => {
    setSortModel(newModel);
  };

  const handleRowSelectionChange = (newModel: GridRowSelectionModel) => {
    console.log(newModel);
    setRowSelectionModel(newModel);
  };

  const handleCustomerMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: GridRowModel<Customer>
  ) => {
    setCustomerCtxMenuEl(event.currentTarget);
    setSelectedCustomer(row);
  };

  const handleCustomerEdit = () => {
    navigate(ROUTES.CUSTOMERS + `/${selectedCustomer?.id}`);
  };

  const handleCustomerDelete = () => {
    deleteCustomer(selectedCustomer?.id!);
    setCustomerCtxMenuEl(null);
  };

  const handleCreateCustomer = () => {
    navigate(ROUTES.CUSTOMER_CREATE);
  };

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
          <DataGrid
            loading={loading}
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
            paginationModel={paginationModel}
            filterMode="server"
            filterModel={filterModel}
            onFilterModelChange={handleFilterChange}
            onPaginationModelChange={handlePaginationChange}
            onRowSelectionModelChange={handleRowSelectionChange}
            onSortModelChange={handleSortChange}
            rowSelectionModel={rowSelectionModel}
            sx={{ m: 4 }}
          ></DataGrid>
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
        <ErrorBox message={error.errorMessage}></ErrorBox>
      </Box>
    );
  } else if (!isError && loading) {
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

export default CustomersPage;
