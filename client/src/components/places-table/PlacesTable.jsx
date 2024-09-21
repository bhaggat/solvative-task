import PropTypes from "prop-types";
import styles from "./PlacesTable.module.css";
import Spinner from "../spinner/Spinner";

const columns = [
  { label: "#", key: "index" },
  { label: "Place Name", key: "city" },
  { label: "Country", key: "country" },
];

const PlacesTable = ({ places, errorMessage, isLoading }) => {
  if (isLoading) return <Spinner />;

  if (errorMessage) return <p>{errorMessage}</p>;

  if (!places?.length) return <p>No result found</p>;

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headerRow}>
          {columns.map((column) => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {places.map((place, index) => (
          <tr key={place.id}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.key === "index" ? (
                  index + 1
                ) : column.key === "country" ? (
                  <div className={styles.countryData}>
                    <img
                      src={`https://flagsapi.com/${place.countryCode}/flat/16.png`}
                    />
                    <div>{place[column.key]}</div>
                  </div>
                ) : (
                  place[column.key]
                )}
              </td>
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
