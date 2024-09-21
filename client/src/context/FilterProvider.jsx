import { createContext, useState, useMemo } from "react";
import { getSearchParams } from "../services/utils";
import PropTypes from "prop-types";

export const SearchContext = createContext();

const FilterProvider = ({ children }) => {
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
    setParams(new URLSearchParams(window.location.search));
  };

  const searchParams = useMemo(() => getSearchParams(params), [params]);
  const value = {
    search: searchParams.search ?? "",
    page: Number(searchParams.page ?? 1),
    limit: Number(searchParams.limit ?? 3),
    updateSearchParams,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
FilterProvider.propTypes = {
  children: PropTypes.any,
};

export default FilterProvider;
