export type SortOptions<T> = Array<{
    field: keyof T;
    direction: "asc" | "desc"
}>

export type Filters<T> = Partial<Record<keyof T, any>>;

export interface QueryParams<T> {
    page?: number;
    pageSize?: number;
    sortOptions: SortOptions<T>;
    filters: Filters<T>
}

