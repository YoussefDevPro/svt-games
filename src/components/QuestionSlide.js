import React, { useState, useEffect } from 'react';
import './question-slide.css';

export default function QuestionSlide({ question, onAnswer, onNext }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const correct = question.correctIndex === index;
    setIsCorrect(correct);

    if (correct) {
      setTimeout(() => onNext(), 1000);
    }
  };

  return (
    <div className="question-container">
      {isCorrect !== null && (
        <div className={isCorrect ? 'correct-overlay' : 'incorrect-overlay'} />
      )}

      <h2>{question.question}</h2>
      
      <div className="choices-container">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={selectedAnswer === index && !isCorrect ? 'button-shake' : ''}
            disabled={selectedAnswer !== null}
          >
            {choice.emoji} {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}