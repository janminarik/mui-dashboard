import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Customer } from '../types/customer';
import { ApiPaginatedResponse, DataGridRequestParams as ApiRequestParams } from '../../../shared/types/Api';
import { createFilterQuery } from '../../../shared/utils/apiUtil';

export const apiCustomers = createApi({
    reducerPath: 'customers',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Customer'],
    endpoints: (builder) => ({
        createCustomer: builder.mutation<Customer, Customer>({
            query: (body) => ({
                url: '/customers',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Customer'],
        }),
        getCustomers: builder.query<Customer[], void>({
            query: () => '/customers',
            providesTags: ['Customer'],
        }),
        getFiltredCustomers: builder.query<ApiPaginatedResponse<Customer>, ApiRequestParams>({
            query: ({ pagination, columnFilters }) => {
                let url = "/customers";

                if (pagination) {
                    url = url + `?_page=${pagination.page}&_limit=${pagination.limit}`;
                }
                if (columnFilters && columnFilters.length > 0) {
                    const filterQuery = createFilterQuery(columnFilters);
                    url = url + "&" + filterQuery;

                }
                return url;
            },
            transformResponse: (response: Customer[], meta): ApiPaginatedResponse<Customer> => {
                const header = meta?.response?.headers.get('X-Total-Count');

                let count = 0;
                if (header) {
                    count = parseInt(header);
                }

                return {
                    result: response,
                    totalCount: count
                }
            }
        }),
        getCustomerById: builder.query<Customer, string>({
            query: (id) => `/customers/${id}`
        }),
        updateCustomer: builder.mutation<Customer, { id: string, body: Partial<Customer> }>({
            query: ({ id, body }) => ({
                url: `/customers/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Customer'],
        }),
        deleteCustomer: builder.mutation<void, string>({
            query: (id) => ({
                url: `/customers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Customer'],
        }),
    }),
});

export const {
    useCreateCustomerMutation,
    useGetCustomersQuery,
    useGetCustomerByIdQuery,
    useGetFiltredCustomersQuery,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = apiCustomers;