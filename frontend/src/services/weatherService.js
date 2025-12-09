// The base path for all API calls. In our unified setup, this is a relative path.
const API_BASE_URL = '/api';

/**
 * A helper function to handle fetch responses and errors.
 * @param {Response} response - The response object from a fetch call.
 * @returns {Promise<any>} - The JSON data from the response.
 * @throws {Error} - Throws an error if the network response is not ok.
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
    const error = new Error(errorData.message || 'Failed to fetch data from the server.');
    // Mimic the error structure that the App.jsx component expects
    error.response = { data: errorData };
    throw error;
  }
  return response.json();
};

/**
 * Fetches weather data for a specific city.
 * @param {string} city - The name of the city.
 * @returns {Promise<any>} - The weather data.
 */
export const getWeatherDataByCity = async (city) => {
  const response = await fetch(`${API_BASE_URL}/weather?city=${encodeURIComponent(city)}`);
  return handleResponse(response);
};

/**
 * Fetches weather data using geographic coordinates.
 * @param {number} lat - The latitude.
 * @param {number} lon - The longitude.
 * @returns {Promise<any>} - The weather data.
 */
export const getWeatherDataByCoords = async (lat, lon) => {
  const response = await fetch(`${API_BASE_URL}/weather?lat=${lat}&lon=${lon}`);
  return handleResponse(response);
};