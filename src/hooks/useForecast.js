import { useState } from 'react';
import axios from 'axios';

import getCurrentDayForecast from '../helpers/getCurrentDayForecast';
import getUpcomingDaysForecast from '../helpers/getUpcomingDaysForecast';
import getCurrentDayDetailedForecast from '../helpers/getCurrentDayDetailedForecast';

const API_KEY = 'A3iGJJNRAAbcXcXGZVC0mEDaEAHHgTKx';
const CITY_URL = 'https://dataservice.accuweather.com/locations/v1/cities/search';
const WEATHER_URL = 'https://dataservice.accuweather.com/currentconditions/v1/';
const FORECAST_URL = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';

const useForecast = () => {
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);

    // Get city information
    const getCity = async location => {
        const { data } = await axios.get(CITY_URL, { params: { apikey: API_KEY, q: location } });

        if (!data || data.length === 0) {
            setError('Cannot found this location!');
            setLoading(false);
            return;
        }

        return data[0];
    };

    // Get weather information
    const getWeather = async id => {
        const { data } = await axios.get(`${WEATHER_URL}${id}`, { params: { apikey: API_KEY, details: true } });
        if (!data || data.length === 0) {
            setError('Something went wrong');
            setLoading(false);
            return;
        }

        return data[0];
    };

    // Get forcast 5 days
    const getForcast = async id => {
        const { data } = await axios.get(`${FORECAST_URL}${id}`, {
            params: { apikey: API_KEY, details: true, metric: true },
        });
        if (!data || data.length === 0) {
            setError('Something went wrong');
            setLoading(false);
            return;
        }

        return data.DailyForecasts;
    };

    const gatherForecastData = ({ data, response, data_forecast }) => {
        const currentDay = getCurrentDayForecast(data, response.EnglishName);
        const currentDayDetails = getCurrentDayDetailedForecast(data_forecast);
        const upcomingDays = getUpcomingDaysForecast(data_forecast);

        setForecast({ currentDay, currentDayDetails, upcomingDays });

        setLoading(false);
    };

    // call APIs
    const submitRequest = async location => {
        setLoading(true);
        setError(false);

        // get location information
        const response = await getCity(location);
        if (!response?.Key) return;

        // get weather data
        const data = await getWeather(response.Key);
        if (!data) return;

        // forecast 5 days
        const data_forecast = await getForcast(response.Key);
        if (!data_forecast) return;

        gatherForecastData({ data, response, data_forecast });
    };

    return {
        isError,
        isLoading,
        forecast,
        submitRequest,
    };
};

export default useForecast;
