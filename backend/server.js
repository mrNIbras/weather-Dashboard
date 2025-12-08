// server.js
require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
// Enable CORS for your frontend application
app.use(cors({ origin: 'http://localhost:5173' })); // Adjust for your frontend URL, especially in production

// Basic security headers
app.use(helmet());
// Parse JSON bodies
app.use(express.json());

// --- Constants ---
const API_KEY = process.env.WEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org';

// --- API Routes ---

/**
 * Geocoding Route: Converts a city name to latitude and longitude.
 * Example: /api/geocode?city=London
 */
app.get('/api/geocode', async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) {
      return res.status(400).json({ message: 'City is required' });
    }

    const geocodeUrl = `${OPENWEATHER_BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
    const response = await axios.get(geocodeUrl);

    if (response.data.length === 0) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.json(response.data[0]);
  } catch (error) {
    console.error('Geocoding Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching geocoding data' });
  }
});

/**
 * Reverse Geocoding Route: Converts latitude and longitude to a city name.
 * Example: /api/reverse-geocode?lat=51.5073&lon=-0.1277
 */
app.get('/api/reverse-geocode', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }

    const reverseGeocodeUrl = `${OPENWEATHER_BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
    const response = await axios.get(reverseGeocodeUrl);

    res.json(response.data[0]);
  } catch (error) {
    console.error('Reverse Geocoding Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching location data' });
  }
});

/**
 * Weather Forecast Route: Fetches current and 5-day/3-hour forecast data.
 * Example: /api/weather?lat=51.5073&lon=-0.1277
 */
app.get('/api/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }

    // We will make two separate calls: one for current weather and one for the forecast.
    const currentWeatherUrl = `${OPENWEATHER_BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const forecastUrl = `${OPENWEATHER_BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      axios.get(currentWeatherUrl),
      axios.get(forecastUrl),
    ]);

    // Combine the responses into a single object that matches the frontend's expected structure.
    const combinedData = {
      current: currentWeatherResponse.data,
      hourly: forecastResponse.data.list, // The 'list' property contains hourly-like forecast data.
      daily: forecastResponse.data.list, // We'll adapt the frontend to derive daily data from this.
    };

    res.json(combinedData);
  } catch (error) {
    console.error('Weather API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

// --- Server Start ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
