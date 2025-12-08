import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Fetches weather data for a given city.
 * It first gets the coordinates for the city and then fetches the weather.
 * @param {string} city - The name of the city.
 * @returns {Promise<object>} - The weather data from the 'onecall' API.
 */
export const getWeatherDataByCity = async (city) => {
  try {
    // 1. Get coordinates for the city
    const geoResponse = await axios.get(`${API_BASE_URL}/geocode`, {
      params: { city },
    });

    if (!geoResponse.data) {
      throw new Error('City not found.');
    }

    const { lat, lon, name, country } = geoResponse.data;

    // 2. Get weather data using coordinates
    const weatherResponse = await axios.get(`${API_BASE_URL}/weather`, {
      params: { lat, lon },
    });

    // Combine location name with weather data for easier use in the UI
    return { ...weatherResponse.data, name, country };
  } catch (error) {
    console.error('Error in weather service:', error);
    // Re-throw the error to be handled by the component
    throw error;
  }
};

/**
 * Fetches weather data for given coordinates.
 * @param {number} lat - The latitude.
 * @param {number} lon - The longitude.
 * @returns {Promise<object>} - The weather data combined with the location name.
 */
export const getWeatherDataByCoords = async (lat, lon) => {
  try {
    // 1. Get location name from coordinates
    const geoResponse = await axios.get(`${API_BASE_URL}/reverse-geocode`, {
      params: { lat, lon },
    });

    if (!geoResponse.data) {
      throw new Error('Location not found.');
    }

    const { name, country } = geoResponse.data;

    // 2. Get weather data using coordinates
    const weatherResponse = await axios.get(`${API_BASE_URL}/weather`, {
      params: { lat, lon },
    });

    return { ...weatherResponse.data, name, country };
  } catch (error) {
    console.error('Error in coordinate weather service:', error);
    throw error;
  }
};