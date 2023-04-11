import React from 'react';
import PropTypes from 'prop-types';
import { timeZoneNames } from './timeZoneNames';
import './TimezoneSelector.css';

const TimezoneSelector = ({ onChange }) => {
  const handleTimezoneClick = (timezone) => {
    onChange(timezone);
  };

  return (
      <div className="timezone-selector">
      <h4>Timezone</h4>
      <ul>
      {timeZoneNames.map((timezone) => (
            <li
            key={timezone}
            className="timezone-option"
            onClick={() => handleTimezoneClick(timezone)}
            >
            {timezone}
            </li>
            ))}
      </ul>
      </div>
      );
};

TimezoneSelector.propTypes = {
onChange: PropTypes.func.isRequired,
};

export default TimezoneSelector;
