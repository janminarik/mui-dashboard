import {
  useDeleteCustomerMutation,
  useGetCustomersQuery,
} from "../api/customersApi";
import { ROUTES } from "../config/routes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import {
  setFilters,
  setPage,
  setSelectedItems,
  setSortOptions,
} from "../slices/customersSlice";
import DataGrid from "../../../shared/components/DataGrid";
import { GridColDef } from "@mui/x-data-grid";

function CustomersPage() {
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
      setPagination={(pagination) => dispatch(setPage(pagination))}
      setFilters={(filters) => dispatch(setFilters(filters))}
      setSortOptions={(sortOptions) => dispatch(setSortOptions(sortOptions))}
      setSelectedItems={(selectedItems) =>
        dispatch(setSelectedItems(selectedItems))
      }
      useGetEntities={useGetCustomersQuery}
      useDeleteEntity={useDeleteCustomerMutation}
    />
  );
}

export default CustomersPage;
