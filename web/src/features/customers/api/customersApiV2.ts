import { CreateCustomer, Customer } from '../types/customer';
import { createGenericApi, QueryParams } from '../../../shared/utils/rtkUtils';

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
    useGetEntitiesQuery: useGetCustomersQuery,
    useGetEntityByIdQuery: useGetCustomerByIdQuery,
    useUpdateEntityMutation: useUpdateCustomerMutation,
    useDeleteEntityMutation: useDeleteCustomerMutation,
    // useGetExtendedCustomerByIdQuery,
} = apiCustomers;
//} = extendedApiCustomers; //apiCustomers;

