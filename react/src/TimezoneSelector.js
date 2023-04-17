import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
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
      <h4 onClick={toggleTimezoneList}>
      Timezone{' '}
      <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </h4>
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
