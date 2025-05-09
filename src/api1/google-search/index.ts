import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    query: {
      q: string;
      num?: number;
      lr?: string;
    };
    resBody: {
      items?: Array<{
        title: string;
        link: string;
        snippet: string;
      }>;
    };
  };
}>;
