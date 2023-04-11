import React, { useEffect, useState } from 'react';
import './App.css';
import MoonPhase from './MoonPhase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import TimezoneSelector from './TimezoneSelector';

function App() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState('UTC');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleTimezoneChange = (newTimeZone) => {
    setTimeZone(newTimeZone);
    setMenuOpen(false);
  };

  useEffect(() => {
      document.title = 'Dashboard';
      }, []);

  useEffect(() => {
      const timer = setInterval(() => {
          setCurrentTime(new Date());
          }, 1000);

      return () => {
      clearInterval(timer);
      };
      }, []);


  return (
      <div className="App">
      <FontAwesomeIcon
      icon={faCog}
      className="config-button"
      onClick={toggleMenu}
      />
      <div className={`menu ${menuOpen ? 'open' : ''}`}>
      <h3>Configuration</h3>
      <TimezoneSelector onChange={handleTimezoneChange} />
      </div>
      <MoonPhase currentTime={currentTime} timeZone={timeZone} onTimezoneChange={handleTimezoneChange}/>
      <header className="App-header">
      <h1>Dashboard</h1>
      </header>

      {/* Add the rest of your App component code here */}
      </div>
      );
}

export default App;
