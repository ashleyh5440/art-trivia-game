import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_SCORE } from '../../utils/mutations';
import { QUERY_SCORES } from '../../utils/queries';

import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import winImg from '../../assets/win.gif';
import loseImg from '../../assets/lose.gif'
import correctSound from '../../assets/correct.mp3';
import wrongSound from '../../assets/wrong.mp3';
import winSound from '../../assets/win.mp3'
import loseSound from '../../assets/lose.mp3';
import useSound from 'use-sound';

function Game() {
    const { state } = useLocation();
    const { questions } = state;
    const category = questions[0].category;
    let [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [buttonColor, setButtonColor] = useState('primary');
    const [timer, setTimer] = useState(0);
    const [playedWinSound, setPlayedWinSound] = useState(false);
    const [playedLoseSound, setPlayedLoseSound] = useState(false);
    let canClick = true;

    const [playCorrectSound] = useSound(correctSound);
    const [playWrongSound] = useSound(wrongSound);
    const [playWinSound] = useSound(winSound);
    const [playLoseSound] = useSound(loseSound);

    const navigate = useNavigate();

    // 15 second timer for each question
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
            setTimer(tempTimer);
            return () => {
                clearInterval(tempTimer);
                clearInterval(timer);
            };
        }
    }, [currentQuestionIndex, questions.length]);

    // checks if user choice was correct or not
    const handleAnswerOptionClick = (option, isCorrect) => {
        console.log(isCorrect);
        setSelectedAnswer(option);
        setCorrectAnswer(isCorrect);
        if (isCorrect && canClick) {
            setButtonColor('success');
            setScore(prevScore => prevScore + 1);
            playCorrectSound();
        } else {
            setButtonColor('danger');
            playWrongSound();
        }
        canClick = false;
        clearInterval(timer);

        setTimeout(() => {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedAnswer(null);
            setCorrectAnswer(null);
            setTimeLeft(15);
            setButtonColor('primary');
            canClick = true;
        }, 3000);
    };
    // save score to user account
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
            console.log('Score saved!');
            navigate('/scores'); //go to scores page after saving score
        } catch (error) {
            console.error(error);
        }
    };

// reset game without saving score
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
      // loser score screen
        if (score <= 5) {
            console.log({ score });
            if (!playedLoseSound) {
                playLoseSound();
                setPlayedLoseSound(true);
            }
            return (
                <div className="score-container animate__animated animate__rotateIn">
                    <p>You scored {score}</p>
                    <div className="score-img">
                      <img src={loseImg} />
                    </div>
                    <div className="animate__animated animate__fadeIn animate__delay-3s">
                        <Button className="save-score-btn" variant="primary" onClick={handleSaveScore}>Save score</Button>
                        <Button variant="primary" onClick={resetGame}>Play again</Button>
                    </div>
                    <div style={{ marginBottom: "47%" }}></div>
                </div>
            );
        } else {
          // winner score screen
            if (!playedWinSound) {
                playWinSound();
                setPlayedWinSound(true);
            }
            return (
                <div className="score-container animate__animated animate__zoomIn">
                    <p>You scored {score}!</p>
                    <div className="score-img">
                      <img src={loseImg} />
                    </div>
                    <div className="animate__animated animate__fadeIn animate__delay-3s">
                        <Button className="save-score-btn" variant="primary" onClick={handleSaveScore}>Save score</Button>
                        <Button variant="primary" onClick={resetGame}>Play again</Button>
                    </div>
                    <div style={{ marginBottom: "47%" }}></div>
                </div>
            );
        }
    }
}

export default Game;

