const currentDayForecast = data => [
    {
        name: 'temp max',
        value: `${Math.round(data[0].Temperature.Maximum.Value)}°`,
        unit: 'C',
    },
    {
        name: 'temp min',
        value: `${Math.round(data[0].Temperature.Minimum.Value)}°`,
        unit: 'C',
    },
    {
        name: 'real feel max',
        value: `${Math.round(data[0].RealFeelTemperature.Maximum.Value)}°`,
        unit: 'C',
    },
    {
        name: 'real feel min',
        value: `${Math.round(data[0].RealFeelTemperature.Minimum.Value)}°`,
        unit: 'C',
    },
];

export default currentDayForecast;
