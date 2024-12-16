import { useDispatch, useSelector } from "react-redux";
import { GridColDef } from "@mui/x-data-grid";

import { AppDispatch, RootState } from "../../../app/store";
import DataGrid from "../../../shared/components/DataGrid";
import { useDeleteCustomerMutation, useGetCustomersQuery } from "../api/customersApiV2";
import { ROUTES } from "../config/routes";
import { setCustomersColumnsVisibility, setCustomersFilters, setCustomersPage, setCustomersSelectedItems, setCustomersSortOptions, showAllCustomersColumns } from "../slices/customersSliceV1";

function CustomersPage1() {
  const dispatch = useDispatch<AppDispatch>();

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
    <DataGrid
      columns={columns}
      showContextMenu
      showDeleteInContextMenu
      showEditInContexMenu
      createEntityRoute={ROUTES.CUSTOMER_CREATE}
      editEntityRoute={ROUTES.CUSTOMERS}
      setColumnsVisibility={(columnsVisibility) => dispatch(setCustomersColumnsVisibility(columnsVisibility))}
      showAllColumns={(visible) => dispatch(showAllCustomersColumns(visible))}
      setPagination={(pagination) => dispatch(setCustomersPage(pagination))}
      setFilters={(filters) => dispatch(setCustomersFilters(filters))}
      setSortOptions={(sortOptions) => dispatch(setCustomersSortOptions(sortOptions))}
      setSelectedItems={(selectedItems) => dispatch(setCustomersSelectedItems(selectedItems))}
      useGetEntities={useGetCustomersQuery}
      useDeleteEntity={useDeleteCustomerMutation}
      {...useSelector((state: RootState) => state.customersList)}
    />
  );
}

export default CustomersPage1;
