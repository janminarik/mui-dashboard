import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Customer } from '../types/customer';

export interface PaginatedResponse<T> {
    result: T[],
    totalCount: number,
}

export const apiCustomers = createApi({
    reducerPath: 'customers',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
    tagTypes: ['Customer'],
    endpoints: (builder) => ({
        // Create
        createCustomer: builder.mutation<Customer, Customer>({
            query: (body) => ({
                url: '/customers',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Customer'],
        }),
        // Read (Get All)
        getCustomers: builder.query<Customer[], void>({
            query: () => '/customers',
            providesTags: ['Customer'],
        }),
        getPagedCustomers: builder.query<PaginatedResponse<Customer>, { page: number, limit: number }>({
            query: ({ page, limit }) => `/customers?_page=${page}&_limit=${limit}`,
            transformResponse: (response: Customer[], meta): PaginatedResponse<Customer> => ({
                result: response,
                totalCount: parseInt(meta?.response?.headers.get('X-Total-Count') || '0', 10)
            })
        }),
        // Read (Get By ID)
        getCustomerById: builder.query<Customer, string>({
            query: (id) => `/customers/${id}`
        }),
        // Update
        updateCustomer: builder.mutation<Customer, { id: string, body: Partial<Customer> }>({
            query: ({ id, body }) => ({
                url: `/customers/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Customer'],
        }),
        // Delete
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
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useGetPagedCustomersQuery
} = apiCustomers;