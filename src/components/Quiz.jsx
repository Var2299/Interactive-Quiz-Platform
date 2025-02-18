// src/components/Quiz.jsx
import React, { useState, useCallback } from 'react';
import { addAttempt, getAttempts } from '../utils/db';
import Timer from './Timer';
import Question from './Question';
import Scoreboard from './Scoreboard';

// Sample questions including both MCQ and text-based answers.
const sampleQuestions = [
    {
      id: 1,
      question: "Which planet is closest to the Sun?",
      options: ["Venus", "Mercury", "Earth", "Mars"],
      answer: "Mercury",
    },
    {
      id: 2,
      question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: "Queue",
    },
    {
      id: 3,
      question: "Which of the following is primarily used for structuring web pages?",
      options: ["Python", "Java", "HTML", "C++"],
      answer: "HTML",
    },
    {
      id: 4,
      question: "Which chemical symbol stands for Gold?",
      options: ["Au", "Gd", "Ag", "Pt"],
      answer: "Au",
    },
    {
      id: 5,
      question: "Which of these processes is not typically involved in refining petroleum?",
      options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
      answer: "Filtration",
    },
    // Text-based questions
    {
      id: 6,
      type: "text",
      question: "What is the value of 12 + 28?",
      answer: "40",
    },
    {
      id: 7,
      type: "text",
      question: "How many states are there in the United States?",
      answer: "50",
    },
    {
      id: 8,
      type: "text",
      question: "In which year was the Declaration of Independence signed?",
      answer: "1776",
    },
    {
      id: 9,
      type: "text",
      question: "What is the value of pi rounded to the nearest integer?",
      answer: "3",
    },
    {
      id: 10,
      type: "text",
      question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
      answer: "120",
    },
  ];
  
const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  const [attemptHistory, setAttemptHistory] = useState([]);

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  // Handle answer selection from both MCQ and text input questions.
  const handleAnswer = (answer) => {
    // Prevent multiple selections while feedback is showing.
    if (feedback) return;

    let isCorrect;
    if (currentQuestion.type === "text") {
      isCorrect =
        String(answer).trim().toLowerCase() ===
        String(currentQuestion.answer).trim().toLowerCase();
    } else {
      isCorrect = answer === currentQuestion.answer;
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`Incorrect! The correct answer was ${currentQuestion.answer}`);
    }

    // Wait 2 seconds to display feedback before moving on.
    setTimeout(() => {
      if (currentQuestionIndex + 1 < sampleQuestions.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setFeedback("");
      } else {
        finishQuiz();
      }
    }, 2000);
  };

  // Called when the timer runs out.
  const handleTimeUp = useCallback(() => {
    if (!feedback) {
      setFeedback(`Time's up! The correct answer was ${currentQuestion.answer}`);
      setTimeout(() => {
        if (currentQuestionIndex + 1 < sampleQuestions.length) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setFeedback("");
        } else {
          finishQuiz();
        }
      }, 2000);
    }
  }, [currentQuestion, currentQuestionIndex, feedback]);

  // Finish quiz and save attempt.
  const finishQuiz = async () => {
    setQuizFinished(true);
    const attempt = {
      date: new Date().toISOString(),
      score: score,
      total: sampleQuestions.length,
    };
    await addAttempt(attempt);
    const attempts = await getAttempts();
    setAttemptHistory(attempts);
  };

  if (quizFinished) {
    return (
      <Scoreboard
        score={score}
        total={sampleQuestions.length}
        attemptHistory={attemptHistory}
      />
    );
  }

  return (
    <div className="quiz-container">
        <div className='ques-timer'>
      <Question
        questionData={currentQuestion}
        onAnswerSelect={handleAnswer}
        disabled={!!feedback}
        feedback={feedback}
      />
      <Timer initialTime={30} onTimeUp={handleTimeUp} resetTrigger={currentQuestionIndex} />
      </div>
      <div className="attempt-info">
        Question {currentQuestionIndex + 1} of {sampleQuestions.length}
      </div>
    </div>
  );
};

export default Quiz;
