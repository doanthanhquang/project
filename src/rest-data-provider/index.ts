import { DataProvider } from '@refinedev/core';
import qs from 'query-string';
import { serialize } from 'object-to-formdata';
import { generateSort, generateFilter, axiosInstance } from './utils';
import Parser from './utils/parser';

const { stringify } = qs;

type MethodTypes = 'get' | 'delete' | 'head' | 'options';
type MethodTypesWithBody = 'post' | 'put' | 'patch';

function convertObject(obj: Record<string, any>): Record<string, any> {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && obj[key].hasOwnProperty('id')) {
      obj[`${key}_id`] = obj[key].id;
      delete obj[key];
    }
  }
  return obj;
}

export const baseDataProvider = (
  apiUrl: string,
  axiosInstance: any,
): Omit<Required<DataProvider>, 'createMany' | 'updateMany' | 'deleteMany'> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const { current = 1, pageSize = 1000, mode = 'server' } = pagination ?? {};

    const { headers: headersFromMeta, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? 'get';

    const queryFilters = generateFilter(filters);

    const query: {
      limit?: number;
      page?: number;
      sorts?: string[];
      order?: string;
    } = {};

    if (mode === 'server') {
      query.page = current;
      query.limit = pageSize;
    }

    query.sorts = generateSort(sorters);

    const params = new Parser({
      includes: [],
      appends: [],
      fields: {},
      filters: queryFilters,
      sorts: query.sorts,
      page: query.page,
      limit: query.limit,
      payload: null,
    }).query();
    try {
      const { data, headers } = await axiosInstance.get(url, {
        headers: headersFromMeta,
        method: requestMethod,
        params,
      });
      const total = +data?.pagination?.total || data?.data?.length || 0;

      return {
        ...data,
        total,
      };
    } catch (error) {
      console.log(error);
      return {
        data: [],
        total: 0,
      };
    }
  },

  getMany: async ({ resource, ids, meta }) => {
    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? 'get';

    const { data } = await axiosInstance.get(
      `${apiUrl}/${resource}?${stringify({ 'filter[id]': ids }, { encode: false, arrayFormat: 'comma' })}`,
      { headers },
    );

    return {
      data: data.data,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? 'post';

    const isFormData = headers && headers['content-type'] === 'multipart/form-data';

    const formDataOrJson = isFormData ? serialize(variables, { indices: true }) : variables;

    const { data } = await axiosInstance.post(url, formDataOrJson, {
      headers,
    });

    return {
      data: data.data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? 'patch';
    console.log('before', variables);
    if (meta?.idOnlyPass) {
      convertObject(variables as any);
    }
    console.log('after: ', variables);

    const { data } = await axiosInstance.put(url, variables, {
      headers,
    });

    return {
      data: data.data,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? 'get';

    const { data } = await axiosInstance.get(url, { headers });

    return {
      data: data.data,
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? 'delete';

    const { data } = await axiosInstance.delete(url, {
      data: variables,
      headers,
    });

    return {
      data: data.data,
    };
  },

  getApiUrl: () => apiUrl,

  custom: async ({ url, method, filters, sorters, payload, query, headers, meta }) => {
    let requestUrl = url;

    if (query) {
      requestUrl = `${requestUrl}?&${stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case 'put':
      case 'post':
      case 'patch':
        axiosResponse = await axiosInstance[method](url, payload, {
          headers,
        });
        break;
      case 'delete':
        axiosResponse = await axiosInstance.delete(url, {
          data: payload,
          headers: headers,
        });
        break;
      default:
        axiosResponse = await axiosInstance.get(requestUrl, {
          headers,
          ...(meta?.config || {}),
        });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});

export const dataProvider = baseDataProvider(import.meta.env.VITE_API_URL, axiosInstance);
