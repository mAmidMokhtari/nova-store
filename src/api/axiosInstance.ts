import axios, { AxiosError, type AxiosInstance } from 'axios';

import { ApiErrorCode } from '@/types/enums';
import { env } from '@/utils/env';

import { ApiError } from './ApiError';

const REQUEST_TIMEOUT_MS = 15_000;

function resolveErrorCode(error: AxiosError): ApiErrorCode {
  if (error.code === AxiosError.ECONNABORTED || error.code === AxiosError.ETIMEDOUT) {
    return ApiErrorCode.Timeout;
  }

  const status = error.response?.status;

  if (status === undefined) return ApiErrorCode.Network;
  if (status === 404) return ApiErrorCode.NotFound;
  if (status >= 500) return ApiErrorCode.Server;

  return ApiErrorCode.Unknown;
}

/**
 * The only HTTP client of the app, used on the server and in the browser.
 * The fetch adapter makes server-side calls go through the `fetch` that Next.js
 * extends, instead of Node's `http` module.
 */
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: REQUEST_TIMEOUT_MS,
  adapter: 'fetch',
  headers: { Accept: 'application/json' },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(new ApiError(ApiErrorCode.Unknown));
    }

    return Promise.reject(new ApiError(resolveErrorCode(error), error.response?.status ?? null));
  },
);
