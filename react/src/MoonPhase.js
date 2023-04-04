
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { format, differenceInDays } from 'date-fns';
import './MoonPhase.css';

const MoonPhase = ({ date }) => {
  const [shadowWidth, setShadowWidth] = useState(0);

  const calculateLunarAge = (date) => {
    const referenceDate = new Date(2000, 0, 6);
    const daysBetween = differenceInDays(date, referenceDate) % 29.53058867;
    return daysBetween < 0 ? daysBetween + 29.53058867 : daysBetween;
  };

  const getShadowWidth = (lunarAge) => {
    const phasePercent = (lunarAge / 29.53058867) * 100;
    return phasePercent < 50 ? 100 - (phasePercent * 2) : (phasePercent - 50) * 2;
  };

  useEffect(() => {
      const lunarAge = calculateLunarAge(date);
      setShadowWidth(getShadowWidth(lunarAge));
      }, [date]);

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
      <div className="moon">
        <div
          className="moon-phase"
          style={{
          width: `${shadowWidth}%`,
          }}
        ></div>
    </div>
    </div>
);
  };

MoonPhase.propTypes = {
date: PropTypes.instanceOf(Date).isRequired,
};

export default MoonPhase;
