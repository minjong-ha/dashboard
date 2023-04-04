import React, { useEffect } from 'react';
import './App.css';
import MoonPhase from './MoonPhase';

function App() {
  useEffect(() => {
      document.title = 'Dashboard';
      }, []);
  const today = new Date();

  return (
      <div className="App">
      <MoonPhase date={today}/>

      <header className="App-header">
      <h1>Dashboard</h1>
      </header>

      {/* Add the rest of your App component code here */}
      </div>
      );
}

export default App;
