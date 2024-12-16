import { useNavigate, useParams } from "react-router-dom";
import {
  apiCustomers,
  useCreateCustomerMutation,
  useGetCustomerByIdQuery,
  useUpdateCustomerMutation,
} from "../api/customersApiV2";
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
import { CreateCustomer, Customer } from "../types/customer";

const textFieldSx: SxProps<Theme & TextFieldProps> = { mt: 3 };

interface CustomerForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [formValue, setFormValues] = useState<CustomerForm>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  //TODO refacktoring

  const skipQuery = id === undefined;

  //GET
  const {
    data: customer,
    isFetching: isLoadingGetCustomer,
    isError: isErrorGetCustomer,
    error: errorGetCustomer,
  } = useGetCustomerByIdQuery(id!, { skip: skipQuery });

  //PUT
  const [updateCustomer, updateResult] = useUpdateCustomerMutation();
  const {
    isLoading: isUpdatingCustomer,
    isError: isErrorUpdateCustomer,
    error: errorUpdateCustomer,
    isSuccess: isSucessUpdateCustomer,
    data: updateCustomerData,
  } = updateResult;

  //POST
  const [createCustomer, createResult] = useCreateCustomerMutation();
  const {
    isLoading: isCreateCustomer,
    isError: isErrorCreateCustomer,
    error: errorCreateCustomer,
    isSuccess: isSucessCreateCustomer,
    data: createCustomerData,
  } = updateResult;

  //merge
  const isLoading =
    isLoadingGetCustomer || isUpdatingCustomer || isCreateCustomer;
  const isError =
    isErrorGetCustomer || isErrorUpdateCustomer || isErrorCreateCustomer;
  const error = errorGetCustomer || errorUpdateCustomer || errorCreateCustomer;

  useEffect(() => {
    if (isEditMode) {
      setFormValues({
        firstName: customer?.firstName || "",
        lastName: customer?.lastName || "",
        email: customer?.email || "",
        phoneNumber: customer?.phoneNumber || "",
      });
    }
  }, [customer, isEditMode]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    if (isEditMode) {
      const customerToUpdate = {
        id: id!,
        ...customer,
        ...formValue,
        updatedAt: new Date(),
      };
      console.log("customer to update", customerToUpdate);
      const updatedCustomer = await updateCustomer({
        id: id!,
        body: customerToUpdate,
      });
      if (updatedCustomer) {
        navigate(-1);
      }
    } else {
      const newCustomer: CreateCustomer = { ...formValue, isVerified: false };
      const createdCustomer = await createCustomer(newCustomer).unwrap();
      if (createdCustomer) {
        navigate(-1);
      }
    }
  };

  const handleInputChange = (
    field: keyof CustomerForm,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
