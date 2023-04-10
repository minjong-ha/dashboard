import React, { useEffect, useState } from 'react';
import './App.css';
import MoonPhase from './MoonPhase';


function App() {

  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState('UTC');

  const handleTimezoneChange = (newTimeZone) => {
    setTimeZone(newTimeZone);
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
      <MoonPhase currentTime={currentTime} timeZone={timeZone} onTimezoneChange={handleTimezoneChange}/>
      <header className="App-header">
      <h1>Dashboard</h1>
      </header>

      {/* Add the rest of your App component code here */}
      </div>
      );
}

export default App;
