import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import ProgressBar from '../components/ProgressBar';
import type { AnswerRecord, Question, QuizResultState } from '../types';

const shuffleArray = <T,>(arr: T[]): T[] => {
  return [...arr].sort(() => Math.random() - 0.5);
};

type QuizState = 'question' | 'answer' | 'result';

const QuizPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>('question');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // 🕒 Timer state
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/questions.json');
        if (!res.ok) throw new Error('Failed to load questions');
        const data: Question[] = await res.json();
        const limited = data.slice(0, 8);
        setQuestions(shuffleArray(limited));
      } catch (e: any) {
        setError(e?.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const total = questions.length;
  const current = questions[currentIndex];

  // Reset timer on question change
  useEffect(() => {
    setTimeLeft(30);
  }, [currentIndex]);

  // Timer countdown
  useEffect(() => {
    if (quizState !== 'question') return;
    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizState]);

  const handleTimeUp = () => {
    if (!current) return;

    const record: AnswerRecord = {
      questionId: current.id,
      selectedIndex: selectedIndex,
      isCorrect: false,
    };

    const newAnswers = [...answers];
    newAnswers[currentIndex] = record;
    setAnswers(newAnswers);

    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setQuizState('question');
      setShowFeedback(false);
      setTimeLeft(30);
    } else {
      const score = newAnswers.filter((a) => a?.isCorrect).length;
      const resultState: QuizResultState = {
        answers: newAnswers,
        totalQuestions: total,
        score,
        questions,
      };
      sessionStorage.setItem('quizResult', JSON.stringify(resultState));
      navigate('/results');
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (quizState !== 'question') return;
    
    setSelectedIndex(index);
    setQuizState('answer');
    
    const correct = index === current?.correctIndex;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Auto-advance after showing feedback
    setTimeout(() => {
      setShowFeedback(false);
      setQuizState('result');
    }, 2000);
  };

  const handleNext = () => {
    if (!current || selectedIndex === null) return;
    
    const record: AnswerRecord = {
      questionId: current.id,
      selectedIndex: selectedIndex,
      isCorrect: isCorrect,
    };
    
    const newAnswers = [...answers];
    newAnswers[currentIndex] = record;
    setAnswers(newAnswers);

    if (currentIndex + 1 < total) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setQuizState('question');
      setShowFeedback(false);
    } else {
      const score = newAnswers.filter((a) => a?.isCorrect).length;
      const resultState: QuizResultState = {
        answers: newAnswers,
        totalQuestions: total,
        score,
        questions,
      };
      sessionStorage.setItem('quizResult', JSON.stringify(resultState));
      navigate('/results');
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) return;
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedIndex(answers[prevIndex]?.selectedIndex ?? null);
    setQuizState('question');
    setShowFeedback(false);
  };

  if (loading) return (
    <div className="container">
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading questions…</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container">
      <div className="error">
        <p role="alert">{error}</p>
        <button onClick={() => window.location.reload()} className="primary">Retry</button>
      </div>
    </div>
  );
  
  if (!current) return (
    <div className="container">
      <p>No questions available.</p>
    </div>
  );

  return (
    <div className="container">
      <header className="header">
        <h1>Quiz App</h1>
        {/* 🕒 Show Timer */}
        <div className="timer">⏳ Time Left: {timeLeft}s</div>
      </header>
      
      <ProgressBar current={currentIndex} total={total} />
      
      <div className={`question-container ${quizState}`}>
        <QuestionCard
          question={current}
          selectedIndex={selectedIndex}
          onSelect={handleAnswerSelect}
          disabled={quizState !== 'question' || timeLeft === 0} // disable if time runs out
          showFeedback={showFeedback}
          isCorrect={isCorrect}
          correctIndex={current.correctIndex}
        />
        
        {showFeedback && (
          <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-icon">
              {isCorrect ? '✓' : '✗'}
            </div>
            <div className="feedback-text">
              {isCorrect ? 'Correct!' : 'Incorrect!'}
            </div>
            <div className="feedback-explanation">
              {isCorrect 
                ? 'Well done!' 
                : `The correct answer is: ${current.options[current.correctIndex]}`
              }
            </div>
          </div>
        )}
      </div>
      
      <div className="nav">
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0} 
          className="secondary"
        >
          Previous
        </button>
        
        {quizState === 'result' && (
          <button 
            onClick={handleNext} 
            className="primary"
          >
            {currentIndex + 1 < total ? 'Next Question' : 'Finish Quiz'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;