require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());

const axiosInstance = axios.create({
  baseURL: process.env.RAPID_BASE_URL,
  headers: {
    "x-rapidapi-key": process.env.RAPID_GEO_DB_API_KEY,
    "x-rapidapi-host": process.env.RAPID_HOST,
  },
});

app.get("/places", async (req, res) => {
  const { search = "", limit = 3, page = 1 } = req.query;
  const { RAPID_BASE_URL, RAPID_GEO_DB_API_KEY, RAPID_HOST } = process.env;
  try {
    const url = `${RAPID_BASE_URL}/geo/cities`;
    const response = await axiosInstance.get(url, {
      params: {
        namePrefix: search,
        limit,
        offset: (page - 1) * limit,
      },
    });
    res.json({
      data: response.data.data,
      total: response.data.metadata.totalCount,
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message ?? "Failed to fetch places" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
