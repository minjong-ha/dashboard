import React, { useState } from 'react';
import { timeZoneNames } from './timeZoneNames';

const TimezoneSelector = ({ onChange }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleTimezoneClick = (timeZone) => {
    onChange(timeZone);
    console.log(timeZone);
    setDropdownVisible(false);
  };

  return (
      <div>
      <button onClick={() => setDropdownVisible(!isDropdownVisible)}>
      Select Timezone
      </button>
      {isDropdownVisible && (
          <div>
          <ul>
          {timeZoneNames.map((timeZone) => (
                <li key={timeZone} onClick={() => handleTimezoneClick(timeZone)}>
                {timeZone}
                </li>
                ))}
          </ul>
          </div>
          )}
      </div>
      );
};

export default TimezoneSelector;
