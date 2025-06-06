import type { DefineMethods } from "aspida";

type BraveSearchResponse = {
  web?: {
    results?: Array<{
      title: string;
      url: string;
      description: string;
    }>;
  };
};

export type Methods = DefineMethods<{
  get: {
    query: {
      q: string;
      count?: number;
      search_lang?: string;
    };
    resBody: BraveSearchResponse;
  };
}>;
