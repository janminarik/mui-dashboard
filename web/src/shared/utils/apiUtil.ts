export const createFilterQuery = (
    items: { column: string; operator: string; value: any }[]
): string => {
    const queryString = items
        .map((filter) => {
            const column = encodeURIComponent(filter.column);
            const filterOperator = encodeURIComponent(filter.operator);
            const value = encodeURIComponent(filter.value);
            const columnFilter = `${column}_${filterOperator}=${value}`;

            return columnFilter;
        })
        .join("&");

    return queryString;
};