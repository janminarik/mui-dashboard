import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateCustomer, Customer } from '../types/customer';
import { buildSearchParams, QueryParams } from '../../../shared/utils/rtkUtils';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export type CustomerQueryParams = QueryParams<Customer>;

export const apiCustomers = createApi({
    reducerPath: 'customers',
    baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
    tagTypes: ['Customer'],
    endpoints: (builder) => ({
        createCustomer: builder.mutation<Customer, CreateCustomer>({
            query: (body) => ({
                url: '/customers',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result) => {
                return result ? [{ type: 'Customer', id: result.id }] : ['Customer']
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data: createdCustomer } = await queryFulfilled;
                    if (createdCustomer.id) {
                        dispatch(
                            apiCustomers.util.updateQueryData(
                                "getCustomers",
                                undefined,
                                (draft) => {
                                    if (draft && Array.isArray(draft)) {
                                        draft.push(createdCustomer);
                                    }
                                }
                            )
                        );
                    }
                } catch (error) {
                    console.error("Error in onQueryStarted:", error);
                }
            },

        }),

        getCustomers: builder.query<{ items: Customer[]; totalCount: number }, CustomerQueryParams | void>({
            query: (queryParams) => (queryParams ? `/customers?${buildSearchParams(queryParams)}` : "/customers"),
            providesTags: ['Customer'],
        }),

        getCustomerById: builder.query<Customer, string>({
            query: (id) => `/customers/${id}`,
            providesTags: (result, error, id) => [{ type: "Customer", id }]
        }),

        updateCustomer: builder.mutation<Customer, { id: string, body: Partial<Customer> }>({
            query: ({ id, body }) => ({
                url: `/customers/${id}`,
                method: 'PATCH',
                body,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Customer", id }]
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
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = apiCustomers;