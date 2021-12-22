import moment from 'moment';

const getUpcomingDaysForecast = data =>
    data.slice(1).map(day => ({
        imgUrl: day.Day.Icon < 10 ? `0${day.Day.Icon}` : `${day.Day.Icon}`,
        high: Math.round(day.Temperature.Maximum.Value),
        low: Math.round(day.Temperature.Minimum.Value),
        weekday: moment(day.EpochDate * 1000)
            .format('dddd')
            .substring(0, 3),
    }));

export default getUpcomingDaysForecast;
