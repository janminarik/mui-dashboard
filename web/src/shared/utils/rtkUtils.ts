import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
