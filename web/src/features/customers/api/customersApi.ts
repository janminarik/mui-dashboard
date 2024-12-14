import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateCustomer, Customer } from '../types/customer';
import { ApiPaginatedResponse, DataGridRequestParams as ApiRequestParams } from '../../../shared/types/Api';
import { createFilterQuery } from '../../../shared/utils/apiUtil';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export type SortOption<T> = Array<{ field: keyof T; direction: 'asc' | 'desc' }>;
export type Filters<T> = Partial<Record<keyof T, any>>;

export interface QueryParams<T> {
    page: number;
    pageSize: number;
    sortOptions?: SortOption<T>;
    filters?: Filters<T>;
}

type CustomerQueryParams = QueryParams<Customer>;

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
                console.log("onQueryStarted invoked with arg:", arg);
                try {
                    const { data: createdCustomer } = await queryFulfilled;
                    console.log("Customer created:", createdCustomer);
                    if (createdCustomer.id) {
                        dispatch(
                            apiCustomers.util.updateQueryData(
                                "getCustomers",
                                undefined,
                                (draft) => {
                                    console.log("Updating cache with new customer");
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
        getCustomers: builder.query<Customer[], void>({
            query: () => '/customers',
            providesTags: ['Customer'],
        }),
        // queryCustomers: builder.query({
        //     query: ({ page, pageSize, sortModel, filters }: CustomerQueryParams) => ({
        //         url: 'customers',
        //         params: {
        //             skip: page * pageSize,
        //             take: pageSize,
        //             orderBy: sortModel?.length ? JSON.stringify({ [sortModel[0].field]: sortModel[0].sort }) : undefined,
        //             filter: filters ? JSON.stringify(filters) : undefined,
        //         },
        //     }),
        //     transformResponse: (response: { data: any[]; total: number }) => ({
        //         data: response.data,
        //         total: response.total,
        //     }),
        // }),
        fetchCustomers: builder.query<{ items: Customer[]; totalCount: number }, CustomerQueryParams>({
            query: ({ page, pageSize, sortOptions, filters }) => {
                const query = new URLSearchParams();

                // Pridanie stránkovania
                query.append('skip', page.toString());
                query.append('take', pageSize.toString());

                // Pridanie triedenia
                if (sortOptions) {
                    query.append(
                        'orderBy',
                        JSON.stringify(sortOptions.map(({ field, direction }) => ({ [field]: direction }))),
                    );
                }

                // Pridanie filtrov
                if (filters) {
                    query.append('filter', JSON.stringify(filters));
                }

                return `/customers?${query.toString()}`;
            },
            providesTags: ['Customer'],
        }),
        getFiltredCustomers: builder.query<ApiPaginatedResponse<Customer>, ApiRequestParams>({
            // query: ({ pagination, columnFilters }) => {
            query: ({ pagination, columnFilters }) => {
                let url = "/customers";

                if (pagination) {
                    url = url + `?_page=${pagination.page}&_limit=${pagination.limit}`;
                }

                if (columnFilters && columnFilters.length > 0) {
                    const filterQuery = createFilterQuery(columnFilters);
                    url = url + "&" + filterQuery;
                }

                console.log("-------------apiCustomers.getFiltredCustomers call", { pagination, columnFilters });
                return url;
            },
            providesTags: ['Customer'],
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
    useFetchCustomersQuery,
    useGetFiltredCustomersQuery,
    useLazyGetFiltredCustomersQuery,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
} = apiCustomers;