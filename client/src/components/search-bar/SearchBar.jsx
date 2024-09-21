import { useCallback, useEffect, useRef } from "react";
import { useSearchParamValues } from "../../hooks/useSearchParamValues";
import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [{ search }, updateSearchParams] = useSearchParamValues();
  const searchRef = useRef();
  const handleOnSubmit = useCallback(
    (e) => {
      e.preventDefault();
      updateSearchParams({ search: searchRef.current.value });
    },
    [updateSearchParams]
  );

  useEffect(() => {
    const handleKeyDown = (ev) => {
      if (ev.code === "Slash" && (ev.ctrlKey || ev.metaKey)) {
        searchRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <form onSubmit={handleOnSubmit} className={styles.container}>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search Places"
        className={styles.searchBar}
        defaultValue={search}
      />
      <div className={styles.shortcut}>Ctrl + /</div>
    </form>
  );
};

export default SearchBar;
