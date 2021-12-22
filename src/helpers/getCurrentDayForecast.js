import moment from 'moment';

const getCurrentDayForecast = (data, location_name) => ({
    weekday: moment(data.EpochTime * 1000).format('dddd'),
    date: moment(data.EpochTime * 1000).format('MMMM Do'),
    location: location_name,
    temperature: Math.round(data.Temperature.Metric.Value),
    weatherIcon: data.WeatherIcon < 10 ? `0${data.WeatherIcon}` : `${data.WeatherIcon}`,
    weatherDescription: data.WeatherText,
});

export default getCurrentDayForecast;
