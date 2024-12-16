import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { buildSearchParams, QueryParams } from "../../../shared/utils/rtkUtils";
import { CreateCustomer, Customer } from "../types/customer";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export type CustomerQueryParams = QueryParams<Customer>;

export const apiCustomers = createApi({
    reducerPath: "customers",
    baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
    tagTypes: ["Customer"],
    endpoints: (builder) => ({
        createCustomer: builder.mutation<Customer, CreateCustomer>({
            query: (body) => ({
                url: "/customers",
                method: "POST",
                body,
            }),
            invalidatesTags: (result) => result ? [{ type: "Customer", id: "LIST" }] : []
        }),

        getCustomers: builder.query<{ items: Customer[]; totalCount: number }, CustomerQueryParams | void>({
            query: (queryParams) => (queryParams ? `/customers?${buildSearchParams(queryParams)}` : "/customers"),
            providesTags: (result) => result ? [
                { type: "Customer", id: "LIST" },
                ...result.items.map((customer) => ({ type: "Customer" as const, id: customer.id }))
            ] : []
        }),

        getCustomerById: builder.query<Customer, string>({
            query: (id) => `/customers/${id}`,
            providesTags: (result, error, id) => [{ type: "Customer", id }],
        }),

        updateCustomer: builder.mutation<Customer, { id: string, body: Partial<Customer> }>({
            query: ({ id, body }) => ({
                url: `/customers/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Customer", id }]
        }),

        deleteCustomer: builder.mutation<void, string>({
            query: (id) => ({
                url: `/customers/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Customer", id: "LIST" }]
        }),
    }),
});

export const {
    useCreateCustomerMutation,
    useGetCustomersQuery,
    useGetCustomerByIdQuery,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useLazyGetCustomersQuery,
} = apiCustomers;

