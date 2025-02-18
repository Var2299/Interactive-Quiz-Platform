// src/components/Question.jsx
import React, { useState } from 'react';

const Question = ({ questionData, onAnswerSelect, disabled, feedback }) => {
  const [textAnswer, setTextAnswer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (textAnswer.trim() === "") {
      // Set error message if the input is empty
      setError("Please provide an answer before submitting.");
    } else {
      // If the answer is valid, clear the error and call onAnswerSelect
      setError("");
      onAnswerSelect(textAnswer);
      setTextAnswer(""); // Clear input field after submission
    }
  };

  return (
    <div className="question">
      <h2>{questionData.question}</h2>
      {questionData.type === "text" ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={disabled}
            placeholder="Type your answer here..."
            style={{
              padding: '12px',
              border: '2px solid #9c27b0', 
              borderRadius: '20px',
              color: '#F5F5DC', 
              outline: 'none', 
              transition: 'border-color 0.3s ease',
            }}
          />
          <button type="submit" disabled={disabled}>Submit</button>
        </form>
      ) : (
        <ul>
          {questionData.options.map(option => (
            <li key={option}>
              <button onClick={() => onAnswerSelect(option)} disabled={disabled}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <div
          style={{
            color: '#ffb300',
            fontSize: '1rem',
            marginTop: '10px',
            fontWeight: 'bold',
          }}
        >
          {error}
        </div>
      )}
      {feedback && <div className="feedback">{feedback}</div>}
    </div>
  );
};

export default Question;
