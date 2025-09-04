import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { QuizResultState } from '../types';

const ResultsPage = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<QuizResultState | null>(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('quizResult');
    if (raw) {
      setResult(JSON.parse(raw));
      // Animate results appearance
      setTimeout(() => setShowResults(true), 300);
    }
  }, []);

  if (!result) {
    return (
      <div className="container">
        <div className="no-results">
          <div className="no-results-icon">📝</div>
          <h2>No Results Found</h2>
          <p>Start a new quiz to see your results here.</p>
          <button className="primary" onClick={() => navigate('/quiz')}>
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! 🌟";
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 70) return "Good job! 👍";
    if (percentage >= 60) return "Not bad! 😊";
    return "Keep practicing! 💪";
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Quiz Results</h1>
        <div className={`score-display ${showResults ? 'show' : ''}`}>
          <div className="score-circle">
            <div className="score-number">{result.score}</div>
            <div className="score-total">/{result.totalQuestions}</div>
          </div>
          <div className="score-percentage">{percentage}%</div>
          <div className="score-message">{getScoreMessage()}</div>
        </div>
      </header>

      <div className={`results ${showResults ? 'show' : ''}`}>
        {result.questions.map((q, idx) => {
          const rec = result.answers[idx];
          const wasCorrect = rec?.isCorrect;
          const userIdx = rec?.selectedIndex;
          return (
            <div 
              className={`result-card ${wasCorrect ? 'correct' : 'incorrect'}`} 
              key={q.id}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="result-header">
                <h3>Question {idx + 1}</h3>
                <div className={`result-status ${wasCorrect ? 'correct' : 'incorrect'}`}>
                  {wasCorrect ? '✓ Correct' : '✗ Incorrect'}
                </div>
              </div>
              <p className="result-question">{q.question}</p>
              <div className="result-options">
                {q.options.map((opt, i) => {
                  const isUser = i === userIdx;
                  const isAnswer = i === q.correctIndex;
                  return (
                    <div 
                      key={i} 
                      className={`result-option ${isAnswer ? 'correct-answer' : ''} ${isUser ? 'user-answer' : ''}`}
                    >
                      <span className="option-index" aria-hidden>
                        {String.fromCharCode(65 + i)}.
                      </span>
                      <span className="option-text">{opt}</span>
                      {isAnswer && <span className="correct-badge">Correct</span>}
                      {isUser && !isAnswer && <span className="user-badge">Your choice</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="nav">
        <Link 
          to="/quiz" 
          className="primary restart-btn" 
          onClick={() => sessionStorage.removeItem('quizResult')}
        >
          🚀 Restart Quiz
        </Link>
      </div>
    </div>
  );
};

export default ResultsPage;


