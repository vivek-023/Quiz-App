import type { FC } from 'react';
import type { Question } from '../types';

type Props = {
  question: Question;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  disabled?: boolean;
  showFeedback?: boolean;
  isCorrect?: boolean;
  correctIndex?: number;
};

export const QuestionCard: FC<Props> = ({ 
  question, 
  selectedIndex, 
  onSelect, 
  disabled = false,
  showFeedback = false,
  isCorrect = false,
  correctIndex = -1
}) => {
  const getOptionClass = (idx: number) => {
    let className = 'option';
    
    if (disabled) className += ' disabled';
    if (selectedIndex === idx) className += ' selected';
    
    if (showFeedback) {
      if (idx === correctIndex) {
        className += ' correct';
      } else if (selectedIndex === idx && !isCorrect) {
        className += ' incorrect';
      }
    }
    
    return className;
  };

  return (
    <div className="card">
      <h2 className="question" aria-live="polite">{question.question}</h2>
      <div className="options" role="list">
        {question.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrectAnswer = idx === correctIndex;
          const isUserAnswer = selectedIndex === idx;
          
          return (
            <button
              key={idx}
              className={getOptionClass(idx)}
              // Prevent clicks if disabled
              onClick={() => { if (!disabled) onSelect(idx); }}
              aria-pressed={isSelected}
              disabled={disabled}  // ensures timer expiry + feedback lock works
            >
              <span className="option-index" aria-hidden>
                {String.fromCharCode(65 + idx)}.
              </span>
              <span>{option}</span>
              {showFeedback && isCorrectAnswer && (
                <span className="correct-indicator" aria-label="Correct answer">✓</span>
              )}
              {showFeedback && isUserAnswer && !isCorrect && (
                <span className="incorrect-indicator" aria-label="Your answer">✗</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;