// src/api/customsearch/v1/index.ts
import type { DefineMethods } from 'aspida';

type SearchResponse = {
  kind: string;
  items: {
    title: string;
    link: string;
    snippet: string;
    // 必要なら他のプロパティも追加
  }[];
};

export type Methods = DefineMethods<{
  get: {
    query: {
      key: string;
      cx: string;
      lr?: string; // optional
      q: string;
      num?: number;
    };
    resBody: SearchResponse;
  };
}>;
