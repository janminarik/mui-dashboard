import {
  useGetFiltredCustomersQuery,
  useLazyGetFiltredCustomersQuery,
} from "../api/customersApi";
import ErrorPage from "../../../shared/pages/ErrorPage";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import EmptyContent from "../../../shared/components/EmptyContent";
import { useEffect, useState } from "react";
import { DataGridRequestParams } from "../../../shared/types/Api";
import { useDebounce } from "react-use";
import { Button } from "@mui/material";

function CustomersPage() {
  const [count, setCount] = useState(0);

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const [debouncedFilterModel, setDebouncedFilterMode] =
    useState<GridFilterModel>({
      items: [],
    });
  const [requestParams, setRequestParams] = useState<DataGridRequestParams>({});

  const [, cancel] = useDebounce(
    () => {
      setDebouncedFilterMode(filterModel);
      console.log("Customer page set filter", filterModel);
    },
    300,
    [filterModel]
  );

  const skipQuery = requestParams.pagination === undefined;

  const { data, isFetching, isError, error } = useGetFiltredCustomersQuery(
    requestParams,
    { skip: skipQuery }
  );
  // const [getCustomersQueryTrigger, { data, isFetching, isError, error }] =
  //   useLazyGetFiltredCustomersQuery();

  useEffect(() => {
    return () => {
      console.log("Customer page clean up");
      cancel();
    };
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

  useEffect(() => {}, [requestParams]);

  const handlePaginationChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
  };

  const handleFilterChange = (newModel: GridFilterModel) => {
    setFilterModel(newModel);
  };

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name" },
    { field: "lastName", headerName: "Last Name" },
    { field: "email", headerName: "Email" },
    { field: "phoneNumber", headerName: "Phone Number" },
    { field: "isVerified", headerName: "Is verified" },
    { field: "createdAt", headerName: "Created At" },
    { field: "updatedAt", headerName: "Updated At" },
  ];

  if (isError) {
    return (
      <ErrorPage title="Loading customers error" message="Ooops error..." />
    );
  } else if (!data?.result) {
    return <EmptyContent message="No customers availabne" />;
  } else {
    return (
      <Grid container flexDirection="row" justifyContent="stretch">
        <Grid size={{ xs: 12 }}>
          <Button
            onClick={() =>
              setCount((prev) => {
                return prev + 1;
              })
            }
          >
            Count {count}
          </Button>
          <DataGrid
            columns={columns}
            rowCount={data.result ? data.totalCount : 0}
            pageSizeOptions={[5, 10, 20]}
            rows={data?.result || []}
            paginationMode="server"
            paginationModel={paginationModel}
            filterMode="server"
            filterModel={filterModel}
            onFilterModelChange={handleFilterChange}
            loading={isFetching}
            onPaginationModelChange={handlePaginationChange}
            sx={{ m: 4 }}
          ></DataGrid>
        </Grid>
      </Grid>
    );
  }
}

export default CustomersPage;
