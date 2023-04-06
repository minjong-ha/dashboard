
import React, { useEffect, useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import './MoonPhase.css';

const MoonPhase = ({ currentTime }) => {
  const [shadowStyle, setShadowStyle] = useState({width: '0%', isWaning: false});

  const formatLocalTime = (currentTime) => {
      const localTime = format(currentTime, "yyyy-MM-dd HH:mm:ss (O)");
        return localTime;
  };

  const calculateLunarAge = (currentTime) => {
    const referenceDate = new Date(2000, 0, 6);
    const daysBetween = differenceInDays(currentTime, referenceDate) % 29.53058867;
    return daysBetween < 0 ? daysBetween + 29.53058867 : daysBetween;
  };

  const getShadowStyle = (lunarAge) => {
    const phasePercent = (lunarAge / 29.53058867) * 100;
    const isWaning = phasePercent > 50;
    const width = isWaning ? (phasePercent - 50) * 2 : 100 - (phasePercent *2);
    return { width, isWaning };
  };

  useEffect(() => {
      const lunarAge = calculateLunarAge(currentTime);
      console.log("lunarAge: ", lunarAge);
      setShadowStyle(getShadowStyle(lunarAge));
      }, [currentTime]);

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

  console.log("shadowStyle: ", shadowStyle);

  return (
      <div className="StarsWrapper">
        <div className="StarsContainer"></div>
        <p className="local-time">{formatLocalTime(currentTime)}</p>
        <div className="moon">
        <div
          className={`moon-phase ${shadowStyle.isWaning ? 'waning' : ''}`}
          style={{
            width: `${shadowStyle.width}%`,
          }}
        ></div>
      </div>
    </div>
);
  };

export default MoonPhase;
