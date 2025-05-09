import type { AspidaClient } from "aspida";
import { dataToURLString } from "aspida";
import type { Methods as Methods_7io3ew } from "./google-search";

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? "/api" : baseURL).replace(/\/$/, "");
  const PATH0 = "/google-search";
  const GET = "GET";

  return {
    google_search: {
      get: (option: {
        query: Methods_7io3ew["get"]["query"];
        config?: T | undefined;
      }) =>
        fetch<Methods_7io3ew["get"]["resBody"]>(
          prefix,
          PATH0,
          GET,
          option
        ).json(),
      $get: (option: {
        query: Methods_7io3ew["get"]["query"];
        config?: T | undefined;
      }) =>
        fetch<Methods_7io3ew["get"]["resBody"]>(prefix, PATH0, GET, option)
          .json()
          .then((r) => r.body),
      $path: (
        option?:
          | {
              method?: "get" | undefined;
              query: Methods_7io3ew["get"]["query"];
            }
          | undefined
      ) =>
        `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ""}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
