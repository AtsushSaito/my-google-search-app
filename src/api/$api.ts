import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_xe5nxf } from './customsearch/v1';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'https://customsearch.googleapis.com' : baseURL).replace(/\/$/, '');
  const PATH0 = '/customsearch/v1';
  const GET = 'GET';

  return {
    customsearch: {
      v1: {
        get: (option: { query: Methods_xe5nxf['get']['query'], config?: T | undefined }) =>
          fetch<Methods_xe5nxf['get']['resBody']>(prefix, PATH0, GET, option).json(),
        $get: (option: { query: Methods_xe5nxf['get']['query'], config?: T | undefined }) =>
          fetch<Methods_xe5nxf['get']['resBody']>(prefix, PATH0, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_xe5nxf['get']['query'] } | undefined) =>
          `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
