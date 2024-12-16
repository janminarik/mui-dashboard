import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ErrorMessage = string | undefined;

export const extractErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined): ErrorMessage => {
  if (!error) return undefined;

  if ("status" in error) {
    // Handle FetchBaseQueryError
    if (error.data && typeof error.data === "object" && "message" in error.data) {
      return (error.data as { message?: string }).message || undefined;
    }
    return typeof error.data === "string" ? error.data : undefined;
  }

  if ("message" in error) {
    // Handle SerializedError
    return error.message;
  }

  return undefined;
};
