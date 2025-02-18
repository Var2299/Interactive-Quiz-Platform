// src/components/Scoreboard.jsx
import React from 'react';

const Scoreboard = ({ score, total, attemptHistory }) => {
  return (
    <div className="scoreboard">
      <h2>
        Your Score: {score} / {total}
      </h2>
      <h3>Attempt History</h3>
      {attemptHistory.length > 0 ? (
        <ul>
          {attemptHistory.map((attempt) => (
            <li key={attempt.id}>
              {new Date(attempt.date).toLocaleString()} - {attempt.score}/{attempt.total}
            </li>
          ))}
        </ul>
      ) : (
        <p>No past attempts available.</p>
      )}
      {/* Optionally add a button to restart the quiz */}
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
};

export default Scoreboard;
