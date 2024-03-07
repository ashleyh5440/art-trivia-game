import { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import './style.css'
import Button from 'react-bootstrap/Button';

function Game() {
    const {state} = useLocation()
    const {questions, category} = state;
    console.log(category, questions, state)

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
      if (currentQuestionIndex < questions.length) {
        const timer = setInterval(() => {
          setTimeLeft(prevTime => {
            if (prevTime === 0) {
              setCurrentQuestionIndex(prevIndex => prevIndex + 1);
              return 15; 
            } else {
              return prevTime - 1;
            }
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [currentQuestionIndex, questions.length]);

    const handleAnswerOptionClick = (option) => {
      // implement logic here
      // Move to the next question after user selects an answer
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setTimeLeft(15); // Reset time for the next question
  };

  if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      return (
          <div className="question-container">
              <p className="question">{currentQuestion.question}</p>
              <p>{timeLeft}</p>
              <div className="options">
                  {currentQuestion.options.map((option, index) => (
                      // <button key={index} onClick={() => handleAnswerOptionClick(option)}>
                      //     {option}
                      // </button>
                      <Button variant="primary" ey={index} onClick={() => handleAnswerOptionClick(option)}>{option}</Button>
                  ))}
              </div>
          </div>
      );
  } else {
      // Display something when all questions are answered
      return <p>All questions answered.</p>;
  }
}

export default Game;