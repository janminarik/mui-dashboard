import { GridFilterModel } from "@mui/x-data-grid";
import { QueryParams } from "../types/commonTypes";

export const buildFilter = (filterModel: GridFilterModel) => {
    return filterModel.items.reduce((acc, item) => {
        if (item.value !== undefined && item.field && item.operator) {
            const { field, operator, value } = item;

            switch (operator) {
                case 'contains':
                    acc[field] = { contains: value };
                    break;
                case 'equals':
                    acc[field] = { equals: value };
                    break;
                case 'startsWith':
                    acc[field] = { startsWith: value };
                    break;
                case 'endsWith':
                    acc[field] = { endsWith: value };
                    break;
                case 'isEmpty':
                    acc[field] = { equals: null };
                    break;
                case 'notEmpty':
                    acc[field] = { not: null };
                    break;
                default:
                    break;
            }
        }
        return acc;
    }, {} as Record<string, any>);
};


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