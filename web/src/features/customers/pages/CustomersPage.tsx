import { useGetFiltredCustomersQuery } from "../api/customersApi";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRowModel,
  GridRowSelectionModel,
  GridToolbar,
} from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { DataGridRequestParams } from "../../../shared/types/Api";
import { useDebounce } from "react-use";
import { Box, Button } from "@mui/material";
import { Customer } from "../types/customer";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../config/routes";
import Loader from "../../../shared/components/Loader";

function CustomersPage() {
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);
  const [debouncedFilterModel, setDebouncedFilterMode] =
    useState<GridFilterModel>({
      items: [],
    });
  const [requestParams, setRequestParams] = useState<DataGridRequestParams>({});
  const [, cancel] = useDebounce(
    () => {
      setDebouncedFilterMode(filterModel);
    },
    300,
    [filterModel]
  );

  const skipQuery = requestParams.pagination === undefined;
  const { data, isLoading, isFetching, isError, error } =
    useGetFiltredCustomersQuery(requestParams, { skip: skipQuery });
  const loading = isLoading || isFetching;

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

    setRequestParams((prev) => ({
      pagination: {
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
      },
      columnFilters: filtredColumns,
    }));
  }, [paginationModel, debouncedFilterModel]);

  const handlePaginationChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
  };

  const handleFilterChange = (newModel: GridFilterModel) => {
    setFilterModel(newModel);
  };

  const handleRowSelectionChange = (newModel: GridRowSelectionModel) => {
    console.log(newModel);
    setRowSelectionModel(newModel);
  };

  const handleEdit = (customer: GridRowModel<Customer>) => {
    console.log(customer);
    navigate(ROUTES.CUSTOMERS + `/${customer.id}`);
  };

  const colDef = { flex: 1 };

  const columns: GridColDef[] = [
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
        <Button
          onClick={() => {
            handleEdit(params.row);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  if (data?.result)
    return (
      <Grid container flexDirection="row" justifyContent="stretch">
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
            pageSizeOptions={[5, 10, 20]}
            rows={data?.result || []}
            paginationMode="server"
            paginationModel={paginationModel}
            filterMode="server"
            filterModel={filterModel}
            onFilterModelChange={handleFilterChange}
            onPaginationModelChange={handlePaginationChange}
            onRowSelectionModelChange={handleRowSelectionChange}
            rowSelectionModel={rowSelectionModel}
            sx={{ m: 4 }}
          ></DataGrid>
        </Grid>
      </Grid>
    );
  else
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

export default CustomersPage;
