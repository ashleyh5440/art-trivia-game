import { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import './style.css'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';

function Game() {
    const {state} = useLocation()
    const {questions, category} = state;
    let [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // const [timeLeft, setTimeLeft] = useState(15);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [buttonColor, setButtonColor] = useState('primary');
    // let timer; //needs to be a state variable
    let canClick = true;
 
    // useEffect(() => {
    //   if (currentQuestionIndex < questions.length) {
    //     clearInterval(timer);
    //     timer = setInterval(() => {
    //       setTimeLeft(prevTime => {
    //         if (prevTime === 0) {
    //           setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    //           return 15; 
    //         } else {
    //           return prevTime - 1;
    //         }
    //       });
    //     }, 1000);
    //     return () => clearInterval(timer);
    //   }
    // }, [currentQuestionIndex, questions.length]);

    const handleAnswerOptionClick = (option, isCorrect) => {
      console.log(isCorrect);
      setSelectedAnswer(option);
      setCorrectAnswer(isCorrect);
      if (isCorrect && canClick) {
        setButtonColor('success');
        setScore(prevScore => prevScore + 1);
        playCorrectSound();
      } else {
        // update button color via state
        setButtonColor('danger');
        playWrongSound();
      }
      canClick = false;
      // clearInterval(timer);

      setTimeout (() => {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setSelectedAnswer(null);
          setCorrectAnswer(null);
          // setTimeLeft(15);
          setButtonColor('primary')
          canClick = true;
        }, 3000);
  };
  if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      return (
          <div className="question-container">
            {/* <p className="timer">{timeLeft}</p> */}
              <p className="question"><strong>{currentQuestion.question}</strong></p>
              <div className="options">
                  {currentQuestion.options.map((option, index) => (
                      <Button variant={buttonColor} key={index} onClick={() => handleAnswerOptionClick(option, option === currentQuestion.correctAnswer)}>{option}</Button>
                  ))}
              </div>
          </div>
      );
  } else {
      // score screen
        if (score <= 5) {
          console.log({score});
          return (
            <div className="score-container">
              <p>You scored {score}</p>
              {playLoseSound()}
              <div style={{marginBottom: "47%"}}></div>
            </div>
          );
        } else {
          return (
            <div className="score-container">
              <p>You scored {score}!</p>
              {playWinSound()}
              <div style={{marginBottom: "47%"}}></div>
            </div>
          );
        }
  }
}

export default Game;