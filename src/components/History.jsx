// src/components/History.jsx
import React from 'react';

const History = ({ attemptHistory }) => {
  return (
    <div className="history">
      <h3>Attempt History</h3>
      {attemptHistory && attemptHistory.length > 0 ? (
        <ul>
          {attemptHistory.map(attempt => (
            <li key={attempt.id}>
              {new Date(attempt.date).toLocaleString()} - {attempt.score}/{attempt.total}
            </li>
          ))}
        </ul>
      ) : (
        <p>No past attempts available.</p>
      )}
    </div>
  );
};

export default History;
