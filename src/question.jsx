import React, { useState } from 'react';
import { Typography, Button, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { shuffle } from 'lodash'; // Import the shuffle function from lodash

const Question = ({ question, removeResult }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showCorrectMessage, setShowCorrectMessage] = useState(false);
  const [clickedShowResult, setClickedShowResult] = useState(false);

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === question.correctAnswer;
    setShowCorrectMessage(isCorrect);
    setSelectedAnswer('');
    setClickedShowResult(true);
  };

  const convertFunc = (question) => {
    const shuffledAnswers = shuffle(question.incorrectAnswers.concat(question.correctAnswer));
    return shuffledAnswers
  }
  const shuffledAns = convertFunc(question);

  return (
    <div>
      <Typography variant="h5">{question.question.text}</Typography>
      
      <RadioGroup value={selectedAnswer} onChange={handleChange}>
        
        {/* Use lodash's shuffle function to randomize the array */}
        {shuffledAns.map((answer, index) => (
          <FormControlLabel
            key={index}
            value={answer}
            control={<Radio />}
            label={answer}
          />
        ))}
      </RadioGroup>
      <Button variant="contained" color="primary" onClick={handleSubmit}>Show Result</Button>
      {removeResult === false ? (
        <>
          {showCorrectMessage && clickedShowResult ? <p>You got it correct!</p> : null}
          {!showCorrectMessage && clickedShowResult ? <p>You got it wrong!</p> : null}
        </>
      ) : null}
    </div>
  );
};

export default Question;
