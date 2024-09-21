import PropTypes from "prop-types";
import styles from "./PlacesTable.module.css";
import Spinner from "../spinner/Spinner";

const columns = [
  { label: "#", key: "index" },
  { label: "Place Name", key: "city" },
  { label: "Country", key: "country" },
];

const PlacesTable = ({ places = [], errorMessage, isLoading }) => {
  if (isLoading) return <Spinner />;
  if (errorMessage) return <p>{errorMessage}</p>;
  if (!places.length) return <p>No result found</p>;

  const renderCell = (column, place, index) => {
    if (column.key === "index") {
      return index + 1;
    } else if (column.key === "country") {
      return (
        <div className={styles.countryData}>
          <img
            src={`https://flagsapi.com/${place.countryCode}/flat/16.png`}
            alt={`${place.country} flag`}
          />
          <div>{place[column.key]}</div>
        </div>
      );
    }
    return place[column.key];
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headerRow}>
          {columns.map(({ key, label }) => (
            <th key={key}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {places.map((place, index) => (
          <tr key={place.id}>
            {columns.map((column) => (
              <td key={column.key}>{renderCell(column, place, index)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

PlacesTable.propTypes = {
  places: PropTypes.arrayOf(PropTypes.object),
  errorMessage: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default PlacesTable;
