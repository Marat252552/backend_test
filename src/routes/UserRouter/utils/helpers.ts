import { AllowedKeys_T } from "../../../shared/types";

interface Queries {
  [key: string]: string | undefined;
}

export const clearEmptyQueries = (queries: Queries) => {
  const result: Queries = {};
  Object.keys(queries).forEach((key) => {
    if (queries[key] === null || queries[key] === undefined) return;
    result[key] = queries[key] as string;
  });
  return result;
};

export default clearEmptyQueries;
