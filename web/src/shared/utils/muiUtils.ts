import { GridFilterModel, GridSortModel } from "@mui/x-data-grid";

export const buildSort = <T>(sortModel: GridSortModel) => {
    return sortModel.map((model) => ({
        field: model.field as keyof T,
        direction: model.sort as "asc" | "desc",
    }))
}

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