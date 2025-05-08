import type { AspidaClient } from 'aspida';
import { dataToURLString } from 'aspida';
import type { Methods as Methods_xe5nxf } from './customsearch/v1';
import type { Methods as Methods_brave } from './brave/search';

const api = <T>({ fetch }: AspidaClient<T>) => {
  const googlePrefix = 'https://customsearch.googleapis.com';
  const bravePrefix = 'https://api.search.brave.com';
  
  const PATH0 = '/customsearch/v1';
  const PATH1 = '/res/v1/web/search';
  const GET = 'GET';

  return {
    customsearch: {
      v1: {
        get: (option: { query: Methods_xe5nxf['get']['query'], config?: T | undefined }) =>
          fetch<Methods_xe5nxf['get']['resBody']>(googlePrefix, PATH0, GET, option).json(),
        $get: (option: { query: Methods_xe5nxf['get']['query'], config?: T | undefined }) =>
          fetch<Methods_xe5nxf['get']['resBody']>(googlePrefix, PATH0, GET, option).json().then(r => r.body),
        $path: (option?: { method?: 'get' | undefined; query: Methods_xe5nxf['get']['query'] } | undefined) =>
          `${googlePrefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      },
    },
    brave: {
      search: {
        get: (option: { 
          query: Methods_brave['get']['query'], 
          headers: Methods_brave['get']['reqHeaders'],
          config?: T | undefined 
        }) => {
          const requestOption = { ...option, headers: option.headers };
          return fetch<Methods_brave['get']['resBody']>(bravePrefix, PATH1, GET, requestOption).json();
        },
        $get: (option: { 
          query: Methods_brave['get']['query'], 
          headers: Methods_brave['get']['reqHeaders'],
          config?: T | undefined 
        }) => {
          const requestOption = { ...option, headers: option.headers };
          return fetch<Methods_brave['get']['resBody']>(bravePrefix, PATH1, GET, requestOption).json().then(r => r.body);
        },
        $path: (option?: { method?: 'get' | undefined; query: Methods_brave['get']['query'] } | undefined) =>
          `${bravePrefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`,
      }
    }
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
