import { useCallback, useMemo, useState } from "react";
import { useSearch } from "../../hooks/useSearch";
import styles from "./Pagination.module.css";
import PropTypes from "prop-types";

const MIN = 1;
const MAX = 10;
const Pagination = ({ total }) => {
  const { limit, page, updateSearchParams } = useSearch();
  const [limitState, setLimitState] = useState(limit);
  const handlePreviousClick = useCallback(() => {
    updateSearchParams({
      page: page - 1,
    });
  }, [page, updateSearchParams]);

  const handleNextClick = useCallback(() => {
    updateSearchParams({
      page: page + 1,
    });
  }, [page, updateSearchParams]);

  const handleOnLimitChange = useCallback((e) => {
    setLimitState(e.target.value);
  }, []);

  const totalPages = useMemo(() => Math.ceil(total / limit), [limit, total]);
  const isError = useMemo(
    () => limitState > MAX || limitState < MIN,
    [limitState]
  );

  const handleOnSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!isError) {
        updateSearchParams({ limit: limitState });
      }
    },
    [isError, limitState, updateSearchParams]
  );

  if (!totalPages) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <button
          onClick={handlePreviousClick}
          disabled={page === 1}
          title="Previous"
        >
          &lt;
        </button>
        <div className={styles.paginationData}>
          {page} / {totalPages}
        </div>
        <button
          onClick={handleNextClick}
          disabled={page === totalPages}
          title="Next"
        >
          &gt;
        </button>
        <form onSubmit={handleOnSubmit}>
          <input
            value={limitState}
            onChange={handleOnLimitChange}
            className={styles.select}
            min={MIN}
            max={MAX}
            type="tel"
            placeholder="Per Page Limit"
          />
        </form>
      </div>
      {isError && (
        <div
          className={styles.error}
        >{`Limit should be between ${MIN} and ${MAX}`}</div>
      )}
    </div>
  );
};
Pagination.propTypes = {
  total: PropTypes.number,
};

export default Pagination;
