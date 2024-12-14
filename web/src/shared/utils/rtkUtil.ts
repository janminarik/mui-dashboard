import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface QueryOrMutationState {
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    error?: unknown;
}

export const aggregateApiRequestState = (results: QueryOrMutationState[]) => {
    const isLoading = results.some(r => r.isLoading || r.isFetching);
    const isError = results.some(r => r.isError);
    const errors = results.map(r => r.error).filter(Boolean);

    return { isLoading, isError, errors };
}