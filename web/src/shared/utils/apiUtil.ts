import { GridFilterModel } from "@mui/x-data-grid";


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