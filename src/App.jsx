import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core'; // Add RadioGroup, FormControlLabel, and Radio imports
import Question from './question';

const Game = () => {
  const [questions, setQuestions] = useState([]);
  const [removeResult, setRemoveResult] = useState(true);



  useEffect(() => {
    fetchQuestions();
    setRemoveResult(false);
  }, [removeResult]);

const fetchQuestions = async () => {
  try {
    const response = await fetch('https://the-trivia-api.com/v2/questions?limit=3');
    const data = await response.json();
    if (Array.isArray(data)) {
      setQuestions(data);
      
    } else {
      console.error('Invalid data format:', data);
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};

  return (
    <Container>
      <h1>Trivia Question</h1>
      {questions.length > 0 ? (
        questions.map((question, index) => (
          <Question key={index} question={question} removeResult={removeResult} />
        ))
      ) : (
        <Typography>No questions available</Typography>
      )}
    </Container>
  );
};

export default Game;
