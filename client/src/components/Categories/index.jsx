import { useState, useEffect } from 'react';
import '../Categories/style.css'
import Button from 'react-bootstrap/Button';

import axios from 'axios';

function Categories() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [currentQuestions, setCurrentQuestions] = useState([]);

    const handleCategorySelection = async (categoryId) => {
        try {
            const response = await axios.get(`https://opentdb.com/api.php?amount=30&category=${categoryId}`);
            const questions = response.data.results;
            console.log('trivia questions', questions); 
            setCurrentQuestions(questions);
        } catch (error) {
            console.error('error getting questions', error);
        }
    };

    return (
        
        <section className="category-buttons">
          <div className="left">
            <Button variant="primary" onClick={() => handleCategorySelection(25)}>Art</Button>
            <Button variant="primary" onClick={() => handleCategorySelection(10)}>Books</Button>
            <Button variant="primary" onClick={() => handleCategorySelection(18)}>Computers</Button>
            <Button variant="primary" onClick={() => handleCategorySelection(11)}>Film</Button>
          </div>
          <div className="right">
            <Button variant="primary" onClick={() => handleCategorySelection(23)}>History</Button>
            <Button variant="primary" onClick={() => handleCategorySelection(17)}>Science & Naure</Button>
            <Button variant="primary" onClick={() => handleCategorySelection(21)}>Sports</Button>
            <Button variant="primary" onClick={() => handleCategorySelection(14)}>TV</Button>
          </div>
          <div>
          {currentQuestions.map(question => (
                <p>{question.question}</p>
            ))}
            {currentQuestions.map(answers => (
                <p>{answers.correct_answer}</p>
            ))}
            {currentQuestions.map(answers => (
                <p>{answers.incorrect_answers}</p>
            ))}
          </div>
        </section>
    )
};

export default Categories;

