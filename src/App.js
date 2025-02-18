// src/App.jsx
import React, { useState } from 'react';
import Quiz from './components/Quiz';

function App() {
  // State to track if the quiz has started
  const [quizStarted, setQuizStarted] = useState(false);

  // Function to start the quiz
  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="AppWrapper">
      <h1>Interactive Quiz Platform</h1>
      {!quizStarted ? (
        <button className="start-quiz-button" onClick={startQuiz}>
          Start Quiz
        </button>
      ) : (
        <div className="App">

        <Quiz />
        </div>
      )}
    </div>
  );
}

export default App;
