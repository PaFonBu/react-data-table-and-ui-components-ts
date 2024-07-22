import { MutationCache, QueryCache } from "@tanstack/react-query";
import {
  apiRequestErrorHandler,
  apiRequestRetryHandler,
} from "../services/apiRequest.service";

export const useQueryConfig = {
  queryCache: new QueryCache({
    onError: (error: unknown): void => apiRequestErrorHandler(error),
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown): void => apiRequestErrorHandler(error),
  }),
  defaultOptions: {
    queries: {
      retry: (failureCount: number, error: unknown): boolean =>
        apiRequestRetryHandler(failureCount, error),
      retryDelay: (): number => 1000,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: (failureCount: number, error: unknown): boolean =>
        apiRequestRetryHandler(failureCount, error),
      retryDelay: (): number => 1000,
    },
  },
};
