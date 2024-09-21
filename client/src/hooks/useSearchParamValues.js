import { useMemo } from "react";
import useSearchParams from "./useSearchParams";

export function useSearchParamValues() {
  const [params, updateSearchParams] = useSearchParams();
  const limit = useMemo(() => Number(params.limit ?? 3), [params]);
  const page = useMemo(() => Number(params.page ?? 1), [params]);
  const search = useMemo(() => params.search ?? "", [params]);
  return [{ search, page, limit }, updateSearchParams];
}
