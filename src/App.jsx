/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import Navbar from 'components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Question from 'pages/Question';
import { getQuestions } from 'utils/api';
import { useEffect, useState } from 'react';

function App() {
  const [questions, setQuestions] = useState({ error: false, data: [] });
  const [countDone, setCountDone] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isStart, setIsStart] = useState(false);
  const [isRestarted, setIsRestarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [timesUp, setTimeUp] = useState(false);

  const getQuestionsHandling = async () => {
    try {
      const dataQuestions = await getQuestions();
      setQuestions(dataQuestions);
      setIsLoading(false);
    } catch (error) {
      setQuestions({ error: true, data: [] });
    }
  };

  const handleCountDone = (count) => {
    setCountDone(count);
  };

  const onClickStartButtonHandler = (value) => {
    setIsStart(value);
  };

  const handleRestartButton = (value) => {
    setIsRestarted(value);
    setIsStart(true);
  };

  const handleQuizFinished = (value) => {
    setIsFinished(value);
  };

  const handleIsActiveTimer = (value) => {
    setTimeUp(value);
  };

  useEffect(() => {
    if (isStart || isRestarted) {
      getQuestionsHandling();
    }
    setIsStart(false);
  }, [isStart]);

  return (
    <div>
      <header className="bg-white drop-shadow py-1 fixed top-0 left-0 w-full z-10">
        <Navbar
          countDone={countDone && countDone}
          isQuizFinished={isFinished}
          isStart={isStart}
          isLoading={isLoading}
          isActiveTimer={handleIsActiveTimer}
        />
      </header>
      <main className="mt-24">
        <Routes>
          <Route
            path="/"
            element={(
              <Question
                item={questions.data.results && questions.data.results}
                countDone={handleCountDone}
                onClickStart={onClickStartButtonHandler}
                isLoading={isLoading}
                isRestartedButton={handleRestartButton}
                quizFinished={handleQuizFinished}
                timesUp={timesUp}
              />
                )}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
