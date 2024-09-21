import { useContext, useRef, useState, useEffect } from 'react';
import './Quiz.css';
import { useTranslation } from 'react-i18next';
import quizData from '../assets/data.json';
import { ThemeContext } from '../components/ThemeContext';

const Quiz = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lock, setLock] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuizData, setCurrentQuizData] = useState([]);

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const optionArr = [option1, option2, option3, option4];

  useEffect(() => {
    setCurrentQuizData(quizData[i18n.language]); 
  }, [i18n.language]);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
  };

  const checkAns = (e, selectedAnswer) => {
    const correctAnswer = currentQuizData[index].ans;

    if (!lock) {
      if (selectedAnswer === correctAnswer) {
        e.target.classList.add('correct');
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('wrong');
        optionArr[correctAnswer.slice(-1) - 1].current.classList.add('correct');
      }
      setLock(true);
    }
  };

  const handleNext = () => {
    if (lock) {
      if (index + 1 < currentQuizData.length) {
        setIndex((prevIndex) => prevIndex + 1);
        setLock(false);
        optionArr.forEach((option) => {
          option.current.classList.remove('wrong');
          option.current.classList.remove('correct');
        });
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const restartQuiz = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setQuizCompleted(false);
    optionArr.forEach((option) => {
      option.current?.classList.remove('wrong');
      option.current?.classList.remove('correct');
    });
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <div className={`container strt ${theme}`}>
        <h2>{t('welcome')}</h2>
        <button onClick={startQuiz} className="start-btn btn">{t('startQuiz')}</button>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className={`container strt ${theme}`}>
        <h2>{t('quizCompleted')}</h2>
        <p className='score'>{t('yourScore', { score, total: currentQuizData.length })}</p>
        <button onClick={restartQuiz} className="restart-btn btn">{t('restartQuiz')}</button>
      </div>
    );
  }

  return (
    <>
      <div className="settings">
      <div className='changers'> 
  <button className="theme-toggle" onClick={toggleTheme}>
    <img
      src={
        theme === 'dark'
          ? 'https://img.icons8.com/?size=100&id=21106&format=png&color=000000'
          : 'https://img.icons8.com/?size=100&id=62034&format=png&color=000000'
      }
      alt="Theme Toggle Icon"
      width="20"
      height="20"
    />
  </button>
  
  <form action="" className="language-select">
    <select onChange={(e) => handleLanguageChange(e.target.value)} value={i18n.language}>
      <option value="en">EN</option>
      <option value="az">AZ</option>
    </select>
  </form>
</div>

      </div>

      <div className={`container ${theme}`}>
        <div className="top">
          <h2>{index + 1}. {currentQuizData[index].question}</h2>
          <h2 className="shower">{index + 1}/{currentQuizData.length}</h2>
        </div>
        <ul>
          <li ref={option1} onClick={(e) => checkAns(e, 'op1')}>{currentQuizData[index].op1}</li>
          <li ref={option2} onClick={(e) => checkAns(e, 'op2')}>{currentQuizData[index].op2}</li>
          <li ref={option3} onClick={(e) => checkAns(e, 'op3')}>{currentQuizData[index].op3}</li>
          <li ref={option4} onClick={(e) => checkAns(e, 'op4')}>{currentQuizData[index].op4}</li>
        </ul>
        <button className="next" onClick={handleNext}>{t('nextQuestion')}</button>
      </div>
    </>
  );
};

export default Quiz;
