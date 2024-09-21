import SearchBar from "./components/search-bar/SearchBar";
import PlacesTable from "./components/places-table/PlacesTable";
import Pagination from "./components/pagination/Pagination";
import { fetchPlaces } from "./services/fetchPlaces";
import { useCallback, useEffect, useState } from "react";
import { useSearchParamValues } from "./hooks/useSearchParamValues";
import styles from "./App.module.css";

const App = () => {
  const [{ page, limit, search }] = useSearchParamValues();
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
      <SearchBar />
      <PlacesTable
        isLoading={isLoading}
        errorMessage={errorMessage}
        places={places.data}
      />
      <Pagination
        isLoading={isLoading}
        places={places.data}
        total={places.total}
      />
    </div>
  );
};

export default App;
