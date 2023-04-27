import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { timeZoneNames, timeZoneCities } from './timeZoneNames';
import './TimezoneSelector.css';

const TimezoneSelector = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCities, setExpandedCities] = useState({});

  const handleTimezoneClick = (timezone) => {
    onChange(timezone);
  };

  const toggleTimezoneList = () => {
    setIsOpen(!isOpen);
  };

  const toggleCitiesList = (timezone) => {
    setExpandedCities((prevState) => ({
          ...prevState,
          [timezone]: !prevState[timezone],
          }));
  };


  console.log(timeZoneCities);

  return (
      <div className="timezone-selector">
      <h4 onClick={toggleTimezoneList}>
      Timezone{' '}
      <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </h4>
      <ul className={isOpen ? 'open' : ''}>
      {timeZoneNames.map((timezone) => (

            <li key={timezone}>
            <div
            className="timezone-option"
            onClick={() => toggleCitiesList(timezone)}
            >
            {timezone}{' '}
            <FontAwesomeIcon
            icon={expandedCities[timezone] ? faChevronUp : faChevronDown}
            />
            </div>
            <ul
            className={`timezone-cities ${
            expandedCities[timezone] ? 'open' : ''
            }`}
            >
            {timeZoneCities[timezone].map((city) => (
                  <li
                  key={city}
                  className="timezone-city"
                  onClick={() => handleTimezoneClick(city)}
                  >
                  {city}
                  </li>
                  ))}
      </ul>
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
