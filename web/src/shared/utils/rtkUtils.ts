import { ActionReducerMapBuilder, SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { capitalize } from "./commonUtils";


export type SortOptions<T> = Array<{
    field: keyof T;
    direction: "asc" | "desc"
}>

export type Filters<T> = Partial<Record<keyof T, any>>;

export interface QueryParams<T> {
    page?: number;
    pageSize?: number;
    sortOptions?: SortOptions<T>;
    filters?: Filters<T>
}

export const buildSearchParams = <T>(queryParams: QueryParams<T>) => {
    const query = new URLSearchParams();
    if (queryParams.page)
        query.append('skip', queryParams.page.toString());

    if (queryParams.pageSize)
        query.append('take', queryParams.pageSize.toString());

    if (queryParams.filters)
        query.append('filter', JSON.stringify(queryParams.filters));

    if (queryParams.sortOptions)
        query.append('orderBy', JSON.stringify(queryParams.sortOptions.map((sort) => ({ [sort.field]: sort.direction }))));

    return query.toString();
}

interface QueryOrMutationState {
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    error?: unknown;
}

export const aggregateApiRequestState = (results: QueryOrMutationState[]) => {
    const isLoading = results.some((r) => r.isLoading || r.isFetching);
    const isError = results.some((r) => r.isError);
    const errors = results
        .map((r) => r.error)
        .filter((error): error is FetchBaseQueryError | SerializedError => !!error);

    return { isLoading, isError, errors };
};

export interface TEntityBase<TId extends string | number> {
    id: TId;
}
export const createGenericApi =
    <TId extends string | number, TEntity extends TEntityBase<TId>, TCreateEntity extends Partial<TEntity>>
        (entityName: string, baseUrl: string,) => {

        const reducerPath = `${entityName.toLowerCase()}s`
        const entityTag = capitalize(entityName);
        const entityPath = `/${entityName.toLowerCase()}s`;

        const baseApi = createApi({
            reducerPath: reducerPath,
            baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
            tagTypes: [`${capitalize(entityName)}`],
            endpoints: (builder) => ({
                createEntity: builder.mutation<TEntity, TCreateEntity>({
                    query: (body) => ({
                        url: entityPath,
                        method: 'POST',
                        body,
                    }),
                    invalidatesTags: (result) => result ? [{ type: entityTag, id: "LIST" }] : []
                }),
                getEntities: builder.query<{ items: TEntity[]; totalCount: number }, QueryParams<TEntity> | void>({
                    query: (queryParams) => (queryParams ? `${entityPath}?${buildSearchParams(queryParams)}`
                        : `/${entityName.toLowerCase()}`),
                    providesTags: (result) => result ? [
                        { type: entityTag, id: "LIST" },
                        ...result.items.map((customer) => ({ type: `${entityTag}` as const, id: customer.id }))
                    ] : []
                }),
                getEntityById: builder.query<TEntity, TId>({
                    query: (id) => `${entityPath}/${id}`,
                    providesTags: (result, error, id) => [{ type: entityTag, id }],
                }),
                updateEntity: builder.mutation<TEntity, { id: TId, body: Partial<TEntity> }>({
                    query: ({ id, body }) => ({
                        url: `${entityPath}/${id}`,
                        method: 'PATCH',
                        body,
                    }),
                    invalidatesTags: (result, error, { id }) => [{ type: entityTag, id }]
                }),
                deleteEntity: builder.mutation<void, TId>({
                    query: (id) => ({
                        url: `${entityPath}/${id}`,
                        method: 'DELETE',
                    }),
                    invalidatesTags: (result, error, id) => [{ type: entityTag, id: "LIST" }]
                }),
            }),
        });

        const {
            useCreateEntityMutation,
            useGetEntitiesQuery,
            useGetEntityByIdQuery,
            useUpdateEntityMutation,
            useDeleteEntityMutation,
        } = baseApi;

        return {
            baseApi, reducerPath, useCreateEntityMutation,
            useGetEntitiesQuery,
            useGetEntityByIdQuery,
            useUpdateEntityMutation,
            useDeleteEntityMutation,
        };
    }
