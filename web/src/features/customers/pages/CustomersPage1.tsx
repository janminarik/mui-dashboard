import { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";

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
      createEntityRoute={ROUTES.CUSTOMER_CREATE}
      editEntityRoute={ROUTES.CUSTOMERS}
      setColumnsVisibility={(columnsVisibility) => dispatch(setCustomersColumnsVisibility(columnsVisibility))}
      setFilters={(filters) => dispatch(setCustomersFilters(filters))}
      setPagination={(pagination) => dispatch(setCustomersPage(pagination))}
      setSelectedItems={(selectedItems) => dispatch(setCustomersSelectedItems(selectedItems))}
      setSortOptions={(sortOptions) => dispatch(setCustomersSortOptions(sortOptions))}
      showAllColumns={(visible) => dispatch(showAllCustomersColumns(visible))}
      showContextMenu
      showDeleteInContextMenu
      showEditInContexMenu
      useDeleteEntity={useDeleteCustomerMutation}
      useGetEntities={useGetCustomersQuery}
      {...useSelector((state: RootState) => state.customersList)}
    />
  );
}

export default CustomersPage1;
