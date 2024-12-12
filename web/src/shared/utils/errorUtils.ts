import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface ExtractedError {
    errorMessage: string | null;
    statusCode: number | null;
}

export const extractErrorDetails = (
    error: FetchBaseQueryError | SerializedError | undefined
): ExtractedError => {
    if (!error) {
        return { errorMessage: null, statusCode: null };
    }

    // Attempt to extract error details based on known structures
    if ('status' in error) {
        const fetchError = error as FetchBaseQueryError;
        const errorMessage =
            typeof fetchError.data === 'string'
                ? fetchError.data
                : (fetchError.data as { message?: string })?.message || JSON.stringify(fetchError.data);

        return {
            errorMessage: errorMessage || (fetchError as any)?.error || null,
            statusCode: typeof fetchError.status === 'number' ? fetchError.status : null,
        };
    }

    if ('message' in error) {
        const serializedError = error as SerializedError;
        return {
            errorMessage: serializedError.message || null,
            statusCode: null,
        };
    }

    // Generic fallback for unstructured errors
    return {
        errorMessage: JSON.stringify(error),
        statusCode: null,
    };
};
