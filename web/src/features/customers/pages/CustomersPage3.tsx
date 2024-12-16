import DataGridWrapper from "../../../shared/components/DataGridWrapper";
import { createDataGridSlice } from "../../../shared/slices/datagridSlice";
import { apiCustomers } from "../api/customersApi";
import { GridColDef } from "@mui/x-data-grid";
import { ROUTES } from "../config/routes";

const customersSlice = createDataGridSlice("customersList");
export const customersReducer = customersSlice.reducer;

function CustomersPage3() {
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
  ];

  return (
    <div>
      <DataGridWrapper
        columns={columns}
        slice={customersSlice}
        api={apiCustomers}
        rowContextMenu={{ show: true, showDelete: true, showEdit: true }}
        createEntityRoute={ROUTES.CUSTOMER_CREATE}
        editEntityRoute={ROUTES.CUSTOMERS}
      ></DataGridWrapper>
    </div>
  );
}

export default CustomersPage3;
