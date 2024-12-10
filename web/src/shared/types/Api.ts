export interface ColumnFilter {
    column: string,
    operator: string,
    value: string,
}

export interface PaginationOptions {
    page: number;
    limit: number;
}

export interface DataGridRequestParams {
    pagination?: PaginationOptions;
    columnFilters?: ColumnFilter[];
}

export interface ApiPaginatedResponse<T> {
    result: T[],
    totalCount: number,
}

