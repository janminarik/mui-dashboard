import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
} from "../api/customersApi";
import {
  Box,
  FormControl,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from "@mui/material";
import { useEffect, useState } from "react";
import Form from "../../../shared/components/Form";

const textFieldSx: SxProps<Theme & TextFieldProps> = { mt: 3 };

interface CustomerForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formValue, setFormValues] = useState<CustomerForm>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const {
    data: customer,
    isFetching: isLoadingGetCustomer,
    isError: isErrorGetCustomer,
    error: errorGetCustomer,
  } = useGetCustomerByIdQuery(id!);

  const [updateCustomer, result] = useUpdateCustomerMutation();
  const {
    isLoading: isUpdatingCustomer,
    isError: isErrorUpdateCustomer,
    error: errorUpdateCustomer,
    isSuccess: isSucessUpdateCustomer,
    data,
  } = result;

  const isLoading = isLoadingGetCustomer || isUpdatingCustomer;
  const isError = isErrorGetCustomer || isErrorUpdateCustomer;
  const error = errorGetCustomer || errorUpdateCustomer;

  useEffect(() => {
    setFormValues({
      firstName: customer?.firstName || "",
      lastName: customer?.lastName || "",
      email: customer?.email || "",
      phoneNumber: customer?.phoneNumber || "",
    });
  }, [customer]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    const customerToUpdate = {
      id: id!,
      ...customer,
      ...formValue,
      updatedAt: new Date(),
    };
    console.log("customer to update", customerToUpdate);
    await updateCustomer({ id: id!, body: customerToUpdate });
  };

  const handleInputChange = (
    field: keyof CustomerForm,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(field, event.target.value);
    setFormValues((prev) => {
      return { ...prev, [field]: event.target.value };
    });
  };

  const formContent = (
    <FormControl>
      <TextField
        sx={textFieldSx}
        size="small"
        label="First name"
        onChange={(event) => handleInputChange("firstName", event)}
        value={formValue.firstName}
      ></TextField>
      <TextField
        size="small"
        label="Last name"
        onChange={(event) => handleInputChange("lastName", event)}
        value={formValue.lastName}
        sx={textFieldSx}
      ></TextField>
      <TextField
        size="small"
        type="email"
        sx={textFieldSx}
        label="email"
        onChange={(event) => handleInputChange("email", event)}
        value={formValue.email}
      ></TextField>
      <TextField
        size="small"
        sx={textFieldSx}
        label="phone"
        onChange={(event) => handleInputChange("phoneNumber", event)}
        value={formValue.phoneNumber}
      ></TextField>
    </FormControl>
  );

  return (
    <Box m={2}>
      <Form
        title="Customer detail"
        isLoading={isLoading}
        isSaving={isUpdatingCustomer}
        isError={isError}
        error={error}
        save={handleSave}
        cancel={handleBack}
        cancelLabel="BACK"
      >
        {formContent}
      </Form>
    </Box>
  );
}

export default CustomerDetailPage;
