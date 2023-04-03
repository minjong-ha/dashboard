import React, { useState, useEffect } from 'react';
import './MoonPhase.css';

function MoonPhase() {
    const [moonPhase, setMoonPhase] = useState(0);

    useEffect(() => {
            const getMoonPhase = async () => {
            const apiKey = 'BSUPRTMGB5FSM5D8EBTU3ZYYS';
            // Coordinate for Seoul, Republic of Korea
            const lat = '37.5665';
            const lon = '126.9780';

            const response = await fetch(
                    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/today?unitGroup=us&key=${apiKey}`
                    );
            const data = await response.json();
            const moonPhaseData = data.days[0].moonphase;

            setMoonPhase(moonPhaseData);
            };

            getMoonPhase();
            }, []);

    const phasePercentage = 100 - moonPhase * 100;

    useEffect(() => {
            // Start the animation when the component is mounted
            const moonPhaseEl = document.querySelector('.moon-phase');
            moonPhaseEl.style.animationPlayState = 'running';
            }, []);


    useEffect(() => {
            const starsContainer = document.querySelector(".StarsContainer");
            const numberOfStars = 50;

            for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement("div");
            star.classList.add("star");
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 2}s`; // Set random animation delays for the sparkle and moveRightToLeft animations
            star.style.animationDuration = `2s`; // Set random animation durations for the moveRightToLeft animation between 10 and 20 seconds


            starsContainer.appendChild(star);
            }
            }, []);

    return (
            <div className="StarsWrapper">
            <div className="StarsContainer"></div>
            <div className="MoonPhase">
            <div className="moon">
            <div
            className="moon-phase"
            style={{ clipPath: `inset(0% ${phasePercentage}% 0% 0%)` }}
            ></div>
            </div>
            </div>
            </div>
           );
}

export default MoonPhase;
