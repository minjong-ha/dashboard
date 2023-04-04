import React, { useState, useEffect } from "react";
import { getUnixTime } from "date-fns";
import "./MoonPhase.css";



function getMoonPhase(date) {
  const julianDate = (date.getTime() / 86400000) + 2440587.5;
  const daysSinceNewMoon = julianDate - 2451550.1;
  const newMoons = daysSinceNewMoon / 29.53058867;
  const phase = (newMoons - Math.floor(newMoons)) * 29.53058867;

  return phase < 15 ? phase / 29.53058867 : (29.53058867 - phase) / 29.53058867;
}


function MoonPhase() {

  const [moonPhase, setMoonPhase] = useState(0);

  useEffect(() => {
      const getMoonPhase = async () => {
      const apiKey = "BSUPRTMGB5FSM5D8EBTU3ZYYS";
      // Coordinate for Seoul, Republic of Korea
      const lat = "37.5665";
      const lon = "126.9780";

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
  console.log("moonPhase:", moonPhase);
  console.log("Phase percentage:", phasePercentage);

  const moonMaskWidth = Math.round(phasePercentage);

  useEffect(() => {
      const moonPhaseEl = document.querySelector(".moon-phase");
      moonPhaseEl.style.width = `${moonMaskWidth}%`;
      }, [moonMaskWidth]);

  useEffect(() => {
      const starsContainer = document.querySelector(".StarsContainer");
      const numberOfStars = 50;

      for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      star.style.animationDuration = `2s`;

      starsContainer.appendChild(star);
      }
      }, []);

  return (
      <div className="StarsWrapper">
      <div className="StarsContainer"></div>
      <div className="MoonPhase">
      <div className="moon">
      <div className="moon-phase"></div>
      </div>
      </div>
      </div>
      );
}

export default MoonPhase;
