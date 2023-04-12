import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { timeZoneNames } from './timeZoneNames';
import './TimezoneSelector.css';

const TimezoneSelector = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTimezoneClick = (timezone) => {
    onChange(timezone);
  };

  const toggleTimezoneList = () => {
    setIsOpen(!isOpen);
  };

  return (
      <div className="timezone-selector">
      <h4 onClick={toggleTimezoneList}>Timezone</h4>
      <ul className={isOpen ? 'open' : ''}>
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
