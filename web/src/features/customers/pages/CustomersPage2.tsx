import { GridColDef } from "@mui/x-data-grid";

import DataGridWrapper from "../../../shared/components/DataGridWrapper";
import { apiCustomers } from "../api/customersApiV2";
import { ROUTES } from "../config/routes";
import { customersSlice } from "../slices/customersSliceV2";

function CustomersPage2() {
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

export default CustomersPage2;
