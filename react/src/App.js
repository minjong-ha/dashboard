import React, { useEffect } from 'react';
import './App.css';
import MoonPhase from './MoonPhase';

function App() {
    useEffect(() => {
            document.title = 'Dashboard';
            }, []);

    return (
            <div className="App">
            <MoonPhase />

            <header className="App-header">
            <h1>Dashboard</h1>
            </header>

            {/* Add the rest of your App component code here */}
            </div>
           );
}

export default App;
