import { useContext } from "react";
import { SearchContext } from "../context/FilterProvider";

export const useSearch = () => useContext(SearchContext);
