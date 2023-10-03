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
  const [isLoading, setIsLoading] = useState(true);

  const getQuestionsHandling = async () => {
    try {
      const dataQuestions = await getQuestions();
      setQuestions(dataQuestions);
      setIsLoading(false);
    } catch (error) {
      setQuestions({ error: true, data: [] });
    }
  };

  const onClickStartButtonHandler = (value) => {
    // setIsStart(value);
  };

  useEffect(() => {
    getQuestionsHandling();
  }, []);

  return (
    <div>
      <header className="bg-white drop-shadow py-1 fixed top-0 left-0 w-full z-10">
        <Navbar />
      </header>
      <main className="mt-24">
        <Routes>
          <Route path="/" element={<Question item={questions.data.results && questions.data.results} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
