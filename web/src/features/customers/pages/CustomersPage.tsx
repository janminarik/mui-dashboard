import { useGetPagedCustomersQuery } from "../api/customersApi";
import ErrorPage from "../../../shared/pages/ErrorPage";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import Grid from "@mui/material/Grid2";
import EmptyContent from "../../../shared/components/EmptyContent";
import { useState } from "react";

function CustomersPage() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const { data, isFetching, isError, error } = useGetPagedCustomersQuery({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  });

  const handlePaginationChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);
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
          <DataGrid
            columns={columns}
            rowCount={data?.totalCount || 0}
            pageSizeOptions={[5, 10, 20]}
            rows={data?.result || []}
            paginationMode="server"
            paginationModel={paginationModel}
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
