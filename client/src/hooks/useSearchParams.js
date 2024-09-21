import { useState, useMemo } from "react";
import { getSearchParams } from "../services/utils";

const useSearchParams = () => {
  const [params, setParams] = useState(
    new URLSearchParams(window.location.search)
  );

  const updateSearchParams = (newParams) => {
    const updatedParams = new URLSearchParams(window.location.search);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        updatedParams.set(key, value);
      } else {
        updatedParams.delete(key);
      }
    });

    const newUrl = `${window.location.pathname}?${updatedParams.toString()}`;
    window.history.pushState(null, "", newUrl);
    setParams(updatedParams);
  };

  const searchParams = useMemo(() => getSearchParams(params), [params]);
  return [searchParams, updateSearchParams];
};

export default useSearchParams;
