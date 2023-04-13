import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { differenceInDays, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import './MoonPhase.css';

const MoonPhase = ({ currentTime, timeZone, onTimezoneChange }) => {

  const [shadowStyle, setShadowStyle] = useState({width: '0%', isWaning: false});
  const [timeAnimationClass, setTimeAnimationClass] = useState('');
  const [timeAnimationKey, setTimeAnimationKey] = useState(0);
  const [prevTimeZone, setPrevTimeZone] = useState(timeZone);

  const formatLocalTime = (currentTime, timeZone) => {
    const localTime = utcToZonedTime(currentTime, timeZone);
    const dateAndTime = format(localTime, "yyyy-MM-dd HH:mm:ss");
    const formattedTime = `${dateAndTime} (${timeZone})`;
    return formattedTime;
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

  useEffect(() => {
      if (prevTimeZone !== timeZone) {
      setTimeAnimationClass("time-animation");
      setPrevTimeZone(timeZone);
      setTimeAnimationKey((prevKey) => prevKey + 1);

      const timer = setTimeout(() => {
          setTimeAnimationClass("");
          }, 1000);

      return () => {
      clearTimeout(timer);
      };
      }
      }, [timeZone, prevTimeZone]);


  console.log("shadowStyle: ", shadowStyle);

  return (
      <div className="StarsWrapper">
      <div key={timeAnimationKey} className={`local-time-wrapper ${timeAnimationClass}`}>
      <p className="local-time">{formatLocalTime(currentTime, timeZone)}</p>
      </div>
      <div className="StarsContainer"></div>
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

MoonPhase.propTypes = {
currentTime: PropTypes.instanceOf(Date).isRequired,
             timeZone: PropTypes.string.isRequired,
             onTimezoneChange: PropTypes.func.isRequired,
};

export default MoonPhase;
