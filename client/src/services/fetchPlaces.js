import { convertToSearchParams } from "./utils";

const baseUrl = "http://localhost:3000";

export const fetchPlaces = async (query = {}) => {
  try {
    const params = convertToSearchParams(query);
    let url = `${baseUrl}/places`;
    if (params) {
      url += `?${params}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching places:", error);
  }
};
