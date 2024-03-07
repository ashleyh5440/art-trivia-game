import { useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// import Auth from ""


// let userClick = 
// let correctAnser = 

// if (userClick === correctAnser) {
//     // button change color/some animation
// } else {
//     // button change color/some animation
//     //highlights correct answer
// }

// function displayQuestions() {
//     //want a timer of 15 sec for each question
//     //next question appears after user makes choice or timer runs out
// }

// function displayChoices() {
//     //how do i make them random?
// }

function Game() {
    const {state} = useLocation()
    const {questions, category} = state;
    console.log(category, questions, state)

    //for scoring
    // const stateRef = useRef(0);
    // const navigate = useNavigate();

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const endQuiz = () => {
        console.log("inside of endquiz ", stateRef.current);
    
        handleScoreSubmit();
    
        setTimeout(() => {
          navigate("/leaderboard");
        }, 4000);
      };

      const handleAnswerOptionClick = (option) => {
        if (option === questions[currentQuestion].correctAnswer) {
          stateRef.current++;
        }
    
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
          setCurrentQuestion(nextQuestion);
        } else {
          setShowScore(true);
          endQuiz();
        }
      };

      window.addEventListener("popstate", (e) => {
        window.location.replace("/");
      });

    return (
        <div className="question-container">
            {questions.map((question, index) => (
                <div key={index}>
                    <p className="question">{question.question}</p>
                    <p className="correct-answer">{question.correct_answer}</p>
                    <div className="incorrect-answers">
                        {question.options.map((answer, index) => (
                        <p key={index}>{answer}</p>
                        ))}
                    </div>
                </div>
             ))}
        </div>
    )
}

export default Game;