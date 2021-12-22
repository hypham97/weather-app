import React from 'react';
import PropTypes from 'prop-types';

import styles from './UpcomingDaysForecastItem.module.css';

const imgUrlBase = 'https://developer.accuweather.com/sites/default/files/';

const UpcomingDaysForecastItem = ({ weekday, high, low, imgUrl }) => (
    <li className={`${styles.weekday} d-flex flex-column justify-content-center align-items-center p-2`}>
        <img src={`${imgUrlBase}${imgUrl}-s.png`} alt="" className="mb-2" />
        <span className="mb-2">{weekday}</span>
        <span className="font-weight-bold">{high}&deg; C</span>
        <span className="font-weight-bold">{low}&deg; C</span>
    </li>
);

UpcomingDaysForecastItem.propTypes = {
    weekday: PropTypes.string.isRequired,
    high: PropTypes.number.isRequired,
    low: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
};

export default UpcomingDaysForecastItem;
