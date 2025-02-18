import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime, onTimeUp, resetTrigger }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Reset the timer when the resetTrigger changes.
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [resetTrigger, initialTime]);

  // Countdown effect: update every second.
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, onTimeUp]);

  // Define dimensions and center of the clock.
  const size = 180;           // SVG canvas size
  const center = size / 2;    // Center point
  const radius = 70;          // Clock face radius
  const handLength = radius - 10; // Hand length

  // Calculate rotation: as time counts down, the hand rotates clockwise.
  const progress = (initialTime - timeLeft) / initialTime;
  const angle = progress * 360;
  const angleRad = ((angle - 90) * Math.PI) / 180; // subtract 90 so 0 starts at the top

  // Calculate the hand's end point.
  const handX = center + handLength * Math.cos(angleRad);
  const handY = center + handLength * Math.sin(angleRad);

  return (
    <div className="clock-timer">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Clock face with gradient */}
        <defs>
          <radialGradient id="clockFaceGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2c5364" />
            <stop offset="100%" stopColor="#0f2027" />
          </radialGradient>
        </defs>

        <circle
          className="clock-face"
          cx={center}
          cy={center}
          r={radius}
          fill="url(#clockFaceGradient)"
          stroke="var(--primary-color)"
          strokeWidth="6"
        />
        
        {/* Tick marks for 12 hours */}
        {Array.from({ length: 12 }).map((_, i) => {
          const tickAngle = (i * 360) / 12 - 90; // start at -90 degrees (12 o'clock)
          const tickAngleRad = (tickAngle * Math.PI) / 180;
          const innerRadius = radius - 15;
          const x1 = center + innerRadius * Math.cos(tickAngleRad);
          const y1 = center + innerRadius * Math.sin(tickAngleRad);
          const x2 = center + radius * Math.cos(tickAngleRad);
          const y2 = center + radius * Math.sin(tickAngleRad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#fff"
              strokeWidth="2"
            />
          );
        })}
        
        {/* Clock hand with glow effect */}
        <line
          x1={center}
          y1={center}
          x2={handX}
          y2={handY}
          stroke="var(--accent-color)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#handGlow)"
        />

        {/* Digital countdown display in the center */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="0.3em"
          fill="#ffffff"
          fontSize="1.2rem"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
        >
          {timeLeft}s
        </text>
      </svg>
    </div>
  );
};

export default Timer;
