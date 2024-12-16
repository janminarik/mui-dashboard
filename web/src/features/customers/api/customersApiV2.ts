import { createGenericApi, QueryParams } from "../../../shared/utils/rtkUtils";
import { CreateCustomer, Customer } from "../types/customer";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export type CustomerQueryParams = QueryParams<Customer>;

export const apiCustomers = createGenericApi<string, Customer, CreateCustomer>("customer", apiBaseUrl);

export const extendedApiCustomers = apiCustomers.baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // getExtendedCustomerById: builder.query<Customer, string>({
        //     query: (id) => `/customers/${id}`,
        // }),
    }),
    overrideExisting: false,
});

export const {
    useCreateEntityMutation: useCreateCustomerMutation,
    useDeleteEntityMutation: useDeleteCustomerMutation,
    useGetEntitiesQuery: useGetCustomersQuery,
    useGetEntityByIdQuery: useGetCustomerByIdQuery,
    useUpdateEntityMutation: useUpdateCustomerMutation,
    // useGetExtendedCustomerByIdQuery,
} = apiCustomers;
//} = extendedApiCustomers; //apiCustomers;

