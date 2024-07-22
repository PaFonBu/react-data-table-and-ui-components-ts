import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { errorAlert } from "./alerts.service";

/** Checks if the response is from supabase or an unknown error */
const isSupabaseErrorResponse = (response: unknown): boolean => {
  if (!response) return false;
  const responseErrorKeys = Object.keys(response);
  if (!responseErrorKeys.includes("count")) return false;
  if (!responseErrorKeys.includes("data")) return false;
  if (!responseErrorKeys.includes("error")) return false;
  if (!responseErrorKeys.includes("status")) return false;
  if (!responseErrorKeys.includes("statusText")) return false;
  const { error } = response as PostgrestSingleResponse<unknown>;
  if (!error) return false;
  const errorKeys = Object.keys(error);
  if (!errorKeys.includes("message")) return false;
  if (!errorKeys.includes("details")) return false;
  if (!errorKeys.includes("hint")) return false;
  if (!errorKeys.includes("code")) return false;
  return true;
};

/** Handles api requests errors */
export const apiRequestErrorHandler = (errorResponse: unknown): void => {
  if (!isSupabaseErrorResponse(errorResponse)) {
    errorAlert();
    return;
  }
  const { error, status } = errorResponse as PostgrestSingleResponse<unknown>;
  if (status === 0) {
    errorAlert({ title: "Server unreachable" });
    return;
  }
  if (!error) {
    errorAlert();
    return;
  }
  const { message } = error;
  if (status === 400) {
    errorAlert({
      title: "Invalid request",
      content: message ?? "",
      icon: "warning",
    });
    return;
  }
  if (status === 403) {
    errorAlert({
      title: "Insufficient permission",
      content: "",
      icon: "warning",
    });
    return;
  }
  if (status === 404) {
    errorAlert({
      title: "Resource not found",
      content: "",
      icon: "warning",
    });
    return;
  }
  if (status === 429) {
    errorAlert({
      title: "To many requests",
      content: "",
      icon: "warning",
    });
    return;
  }
  if (status === 401) {
    errorAlert();
    return;
  }
  errorAlert();
};

/** Handles when an api request must be retried */
export const apiRequestRetryHandler = (
  failureCount: number,
  errorResponse: unknown
): boolean => {
  if (!isSupabaseErrorResponse(errorResponse)) return false;
  const { status } = errorResponse as PostgrestSingleResponse<unknown>;
  if (status === 0 || status === 500) return false;
  if (failureCount < 4) return true;
  return false;
};
