import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { capitalize } from "./commonUtils";

export type Filters<T> = Partial<Record<keyof T, any>>;

export interface QueryParams<T> {
  filters?: Filters<T>;
  page?: number;
  pageSize?: number;
  sortOptions?: SortOptions<T>;
}

export type SortOptions<T> = Array<{
  direction: "asc" | "desc";
  field: keyof T;
}>;

export const buildSearchParams = <T>(queryParams: QueryParams<T>) => {
  const query = new URLSearchParams();
  if (queryParams.page) query.append("skip", queryParams.page.toString());

  if (queryParams.pageSize) query.append("take", queryParams.pageSize.toString());

  if (queryParams.filters) query.append("filter", JSON.stringify(queryParams.filters));

  if (queryParams.sortOptions)
    query.append(
      "orderBy",
      JSON.stringify(
        queryParams.sortOptions.map((sort) => ({
          [sort.field]: sort.direction,
        })),
      ),
    );

  return query.toString();
};

interface QueryOrMutationState {
  error?: unknown;
  isError?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
}

export const aggregateApiRequestState = (results: QueryOrMutationState[]) => {
  const isLoading = results.some((r) => r.isLoading || r.isFetching);
  const isError = results.some((r) => r.isError);
  const errors = results.map((r) => r.error).filter((error): error is FetchBaseQueryError | SerializedError => !!error);

  return { errors, isError, isLoading };
};

export interface TEntityBase<TId extends number | string> {
  id: TId;
}
export const createGenericApi = <TId extends number | string, TEntity extends TEntityBase<TId>, TCreateEntity extends Partial<TEntity>>(
  entityName: string,
  baseUrl: string,
) => {
  const reducerPath = `${entityName.toLowerCase()}s`;
  const entityTag = capitalize(entityName);
  const entityPath = `/${entityName.toLowerCase()}s`;

  const baseApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
      createEntity: builder.mutation<TEntity, TCreateEntity>({
        invalidatesTags: (result) => (result ? [{ id: "LIST", type: entityTag }] : []),
        query: (body) => ({
          body,
          method: "POST",
          url: entityPath,
        }),
      }),
      deleteEntity: builder.mutation<void, TId>({
        invalidatesTags: (result, error, id) => [{ id: "LIST", type: entityTag }],
        query: (id) => ({
          method: "DELETE",
          url: `${entityPath}/${id}`,
        }),
      }),
      getEntities: builder.query<{ items: TEntity[]; totalCount: number }, QueryParams<TEntity> | void>({
        providesTags: (result) =>
          result
            ? [
                { id: "LIST", type: entityTag },
                ...result.items.map((item) => ({
                  id: item.id,
                  type: `${entityTag}` as const,
                })),
              ]
            : [],
        query: (queryParams) => (queryParams ? `${entityPath}?${buildSearchParams(queryParams)}` : `/${entityName.toLowerCase()}`),
      }),
      getEntityById: builder.query<TEntity, TId>({
        providesTags: (result, error, id) => [{ id, type: entityTag }],
        query: (id) => `${entityPath}/${id}`,
      }),
      updateEntity: builder.mutation<TEntity, { body: Partial<TEntity>; id: TId }>({
        invalidatesTags: (result, error, { id }) => [{ id, type: entityTag }],
        query: ({ body, id }) => ({
          body,
          method: "PATCH",
          url: `${entityPath}/${id}`,
        }),
      }),
    }),
    reducerPath: reducerPath,
    tagTypes: [`${capitalize(entityName)}`],
  });

  const { useCreateEntityMutation, useDeleteEntityMutation, useGetEntitiesQuery, useGetEntityByIdQuery, useUpdateEntityMutation } = baseApi;

  return {
    baseApi,
    reducerPath,
    useCreateEntityMutation,
    useDeleteEntityMutation,
    useGetEntitiesQuery,
    useGetEntityByIdQuery,
    useUpdateEntityMutation,
  };
};
