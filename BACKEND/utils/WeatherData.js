import axios from "axios";
import verifyDate from "./date.js";

const WEATHER_API_URL = "https://api.weatherbit.io/v2.0/history/daily";

const getEnergyData = async (lat, lon, start, end, area) => {
  try {
    const url =
      WEATHER_API_URL +
      `?lat=${lat}&lon=${lon}&start_date=${start}&end_date=${end}&key=${process.env.WEATHER_API_KEY}`;
    console.log(url)
    const response = await axios.get(url);
    const { data: weatherDataSet } = response.data;

    const dailyReportList = [];
    weatherDataSet.forEach((weatherData) => {
      const { max_dni, datetime, max_temp_ts } = weatherData;

      const tempCofficient = new Date(max_temp_ts * 1000);
      const tempCofficientInHours = tempCofficient.getHours();
      const calculatedElectricity =
        (area * max_dni * tempCofficientInHours) / 1000;

      dailyReportList.push({
        irradiance: max_dni,
        date: datetime,
        electricity: calculatedElectricity,
      });
    });

    return dailyReportList;
  } catch (error) {
    throw new Error("Error fetching location weather report: " + error.message);
  }
};

async function getWeather(location) {
  const { date1: end_date, date2: start_date } = verifyDate();
  const { _id, name, lat, lon, area } = location;
  const url =
    WEATHER_API_URL +
    `?lat=${lat}&lon=${lon}&start_date=${start_date}&end_date=${end_date}&key=${process.env.WEATHER_API_KEY}`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data.data;

    const electricityData = [];
    weatherData.forEach((Data) => {
      const { max_dni, datetime, max_temp_ts } = Data;

      const tempCofficient = new Date(max_temp_ts * 1000);
      const tempCofficientInHours = tempCofficient.getHours();
      const calculatedElectricity =
        (area * max_dni * tempCofficientInHours) / 1000;

      electricityData.push({
        irradiance: max_dni,
        date: datetime,
        electricity: calculatedElectricity,
      });
    });

    return { _id: _id, name: name, data: electricityData };
  } catch (error) {
    throw new Error(
      `Error retrieving weather data for ${name}:` + error.message
    );
  }
}

const Weatherinfo = async (locations) => {
  const DataArray = [];

  for (const location of locations) {
    const weatherData = await getWeather(location);
    DataArray.push(weatherData);

    // Delay before making the next request
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return DataArray;
};

const weatherManager = {
  getEnergyData,
  Weatherinfo
}

export default weatherManager