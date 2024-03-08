import { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

function Game() {
    const {state} = useLocation()
    const {questions, category} = state;
   

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [buttonColor, setButtonColor] = useState('primary');
    let timer;
    let canClick = true;

    useEffect(() => {
      if (currentQuestionIndex < questions.length) {
        clearInterval(timer);
        timer = setInterval(() => {
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

    const handleAnswerOptionClick = (option, isCorrect) => {
      console.log(isCorrect);
      setSelectedAnswer(option);
      setCorrectAnswer(isCorrect);
      // setTimeout (() => {
      //   setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      //   setSelectedAnswer(null);
      //   setCorrectAnswer(null);
      //   setTimeLeft(15); // reset time for the next question
      // }, 8000);
      if (isCorrect && canClick) {
        // update score state + 1
        // update button color via state
        setButtonColor('success')
      } else {
        // update button color via state
        setButtonColor('danger')
      }
      canClick = false;
      // setTimeLeft(0)
      clearInterval(timer);

      setTimeout (() => {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setSelectedAnswer(null);
          setCorrectAnswer(null);
          setTimeLeft(15);
          setButtonColor('primary')
          canClick = true;
        }, 8000);
  };

  // const getButtonVariant = (option) => {
  //   if (selectedAnswer === option) {
  //       return correctAnswer ? 'success' : 'danger';
  //   }
  //   return 'primary';
  // };

  if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      return (
          <div className="question-container">
            <p className="timer">{timeLeft}</p>
              <p className="question">{currentQuestion.question}</p>
              <div className="options">
                  {currentQuestion.options.map((option, index) => (
                      <Button variant={buttonColor} key={index} onClick={() => handleAnswerOptionClick(option, option === currentQuestion.correctAnswer)}>{option}</Button>
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