import { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_SCORE } from '../../utils/mutations';
import { QUERY_SCORES } from '../../utils/queries';

import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import correctSound from '../../assets/correct.mp3';
import wrongSound from '../../assets/wrong.mp3';
import winSound from '../../assets/win.mp3'
import loseSound from '../../assets/lose.mp3';
import useSound from 'use-sound';

function Game() {
    const {state} = useLocation()
    const {questions} = state;
    const category = questions[0].category;
    let [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [buttonColor, setButtonColor] = useState('primary');
    const [timer, setTimer] = useState(0)
    let canClick = true;

    const [playCorrectSound] = useSound(correctSound);
    const [playWrongSound] = useSound(wrongSound);
    const [playWinSound] = useSound(winSound);
    const [playLoseSound] = useSound(loseSound);
 
    useEffect(() => {
      if (currentQuestionIndex < questions.length) {
        clearInterval(timer);
        let tempTimer = setInterval(() => {
          setTimeLeft(prevTime => {
            if (prevTime === 0) {
              setCurrentQuestionIndex(prevIndex => prevIndex + 1);
              return 15; 
            } else {
              return prevTime - 1;
            }
          });
        }, 1000);
        setTimer(tempTimer)
        return () => {
          clearInterval(tempTimer)
          clearInterval(timer)
        }
      }
    }, [currentQuestionIndex, questions.length]);
        // checks is user's answer is correct
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
      clearInterval(timer);

      setTimeout (() => {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setSelectedAnswer(null);
          setCorrectAnswer(null);
          setTimeLeft(15);
          setButtonColor('primary')
          canClick = true;
        }, 3000);
  };

        // save scores to user 
    const [addScore] = useMutation(ADD_SCORE, {
      refetchQueries: [
        {
          query: QUERY_SCORES,
        },
      ]
    });

    const handleSaveScore = async () => {
      try {
        await addScore({
          variables: {
            category: category,
            score: parseInt(score)
          }
        });
        console.log('scores saved!');
        alert('Score saved!');
      } catch (error) {
        console.error(error);
      }
    };

      //reset game to play again
  const resetGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setButtonColor('primary');
  };

  if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      return (
          <div className="question-container">
            <p className="timer">{timeLeft}</p>
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
            <div className="score-container animate__animated animate__rotateIn">
              <p>You scored {score}</p>
              {playLoseSound()}
              <div className="animate__animated animate__fadeIn animate__delay-3s">
                <Button variant="primary" onClick={handleSaveScore}>Save score</Button>
                <Button variant="primary"  onClick={resetGame}>Play again</Button>
              </div>
              <div style={{marginBottom: "47%"}}></div>
            </div>
          );
        } else {
          return (
            <div className="score-container animate__animated animate__zoomIn">
              <p>You scored {score}!</p>
              {playWinSound()}     
              <div className="animate__animated animate__fadeIn animate__delay-3s">
                <Button variant="primary" onClick={handleSaveScore}>Save score</Button>
                <Button variant="primary" onClick={resetGame}>Play again</Button>
              </div>
              <div style={{marginBottom: "47%"}}></div>
            </div>
          );
        }
  }
};

export default Game;