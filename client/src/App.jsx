import SearchBar from "./components/search-bar/SearchBar";
import PlacesTable from "./components/places-table/PlacesTable";
import Pagination from "./components/pagination/Pagination";
import { fetchPlaces } from "./services/fetchPlaces";
import { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";
import FilterProvider from "./context/FilterProvider";
import { useSearch } from "./hooks/useSearch";

const Container = () => {
  const { page, limit, search, updateSearchParams } = useSearch();
  const [places, setPlaces] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const getPlacesData = useCallback(async () => {
    setIsLoading(true);
    try {
      const responseData = await fetchPlaces({
        search,
        limit,
        page,
      });
      if (responseData?.error) {
        setErrorMessage(responseData.error ?? "Something went wrong");
      } else {
        setPlaces(responseData);
      }
    } catch (err) {
      setErrorMessage(err?.error ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [search, limit, page]);

  useEffect(() => {
    getPlacesData();
  }, [getPlacesData]);

  return (
    <div className={styles.container}>
      <SearchBar
        search={search}
        limit={limit}
        page={page}
        updateSearchParams={updateSearchParams}
      />
      <PlacesTable
        isLoading={isLoading}
        errorMessage={errorMessage}
        places={places.data}
        search={search}
        limit={limit}
        page={page}
        updateSearchParams={updateSearchParams}
      />
      <Pagination
        isLoading={isLoading}
        places={places.data}
        total={places.total}
        search={search}
        limit={limit}
        page={page}
        updateSearchParams={updateSearchParams}
      />
    </div>
  );
};

function App() {
  return (
    <FilterProvider>
      <Container />
    </FilterProvider>
  );
}

export default App;
