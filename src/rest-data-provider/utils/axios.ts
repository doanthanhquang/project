import type { HttpError } from '@refinedev/core';
import axios from 'axios';

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError: HttpError = {
      ...error,
      errors: error.response?.data?.error?.fields,
      message: error.response?.data?.error?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  },
);

export { axiosInstance };
