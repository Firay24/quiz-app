/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

function Timer({
  isQuizFinished, isStart, isActiveTimer, isLoading,
}) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5); // Atur waktu awal di sini
  const [isActive, setIsActive] = useState(false); // Timer dimulai secara otomatis

  useEffect(() => {
    let interval;

    if (isActive && !isLoading) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (hours === 0) {
              setIsActive(false); // Timer berhenti saat mencapai nol
            } else {
              setHours((prevHours) => prevHours - 1);
              setMinutes(59);
              setSeconds(59);
            }
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, hours, minutes, seconds, isLoading]);

  useEffect(() => {
    if (isQuizFinished) {
      setIsActive(false);
    }
  }, [isQuizFinished]);

  useEffect(() => {
    if (isStart) {
      setIsActive(true);
      setHours(0);
      setMinutes(0);
      setSeconds(5);
    }
  }, [isStart]);

  useEffect(() => {
    isActiveTimer(isActive);
  }, [isActive, isActiveTimer]);

  return (
    <div className="text-red-500">
      {
        isActive || isQuizFinished ? (
          <p>
            {String(hours).padStart(2, '0')}
            :
            {String(minutes).padStart(2, '0')}
            :
            {String(seconds).padStart(2, '0')}
          </p>
        ) : null
      }
    </div>
  );
}

export default Timer;
