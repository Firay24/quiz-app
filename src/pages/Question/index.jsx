/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import PreQuiz from 'pages/Pre';
import Loading from 'components/Loading';
import Question from './question';
import Options from './options';

function QuestionPage({
  item, countDone, onClickStart, isLoading, isRestartedButton, quizFinished, timesUp,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [isRestarted, setIsRestarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const answerOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const [result, setResult] = useState({
    done: 0,
    correct: 0,
    wrong: 0,
  });

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < item.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleRestart = () => {
    setIsStart(true);
    setIsRestarted(true);
    setCurrentIndex(0);
    setAnsweredQuestions([]);
    setResult({
      done: 0,
      correct: 0,
      wrong: 0,
    });
  };

  const handleAnswer = (selected) => {
    setSelectedAnswer(selected);
    if (item && item[currentIndex]) {
      const currentQuestion = item[currentIndex];
      const currentQuestionIndex = currentIndex;
      const isCorrect = selected === currentQuestion.correct_answer;

      setAnsweredQuestions((prevAnswer) => ({
        ...prevAnswer,
        [currentQuestionIndex]: {
          selected,
          isCorrect,
        },
      }));

      if (currentIndex < item.length) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const handleStartButton = (value) => {
    setIsStart(value);
  };

  useEffect(() => {
    let doneCount = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    for (const questionIndex in answeredQuestions) {
      if (answeredQuestions.hasOwnProperty(questionIndex)) {
        const question = answeredQuestions[questionIndex];
        doneCount++;
        if (question.isCorrect) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    }

    setResult({
      ...result,
      done: doneCount,
      correct: correctCount,
      wrong: incorrectCount,
    });
  }, [answeredQuestions]);

  useEffect(() => {
    countDone(result.done);
  }, [result]);

  useEffect(() => {
    onClickStart(isStart);
  }, [isStart]);

  const isQuizFinished = item && currentIndex === (item.length);

  useEffect(() => {
    if (item && item[currentIndex]) {
      const currentQuestion = item[currentIndex];
      const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
      const shuffled = shuffleArray(allAnswers);
      setShuffledAnswers(shuffled);
    }
  }, [item, currentIndex]);

  useEffect(() => {
    isRestartedButton(isRestarted);
  }, [isRestarted]);

  useEffect(() => {
    quizFinished(isQuizFinished);
  }, [isQuizFinished]);

  return (
    <div className="flex flex-col items-center">
      {!isStart ? (
        <PreQuiz onClickStart={handleStartButton} />
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="w-1/2">
          <div className="w-full">
            {isQuizFinished || !timesUp ? (
              <div>
                <h2>Quiz Selesai</h2>
                <p>
                  Benar:
                  {' '}
                  {result.correct}
                </p>
                <p>
                  Salah:
                  {' '}
                  {result.wrong}
                </p>
              </div>
            ) : (
              item && item[currentIndex] && (
              <Question item={item[currentIndex]} />
              )
            )}
          </div>
          <div className="mt-5 w-full">
            {isQuizFinished || !timesUp ? null : (
              shuffledAnswers.map((answer, index) => (
                <Options
                  key={index}
                  answer={answer}
                  answerOptions={answerOptions[index]}
                  handleAnswer={handleAnswer}
                  isSelected={answeredQuestions[currentIndex] && answer === answeredQuestions[currentIndex].selected}
                />
              ))
            )}
          </div>
          {
            !isQuizFinished || timesUp ? (
              <div className="flex justify-between w-full mt-5">
                <Button
                  text={<AiOutlineLeft />}
                  style="border hover:bg-gray-400 bg-gray-300"
                  onClick={() => handlePrev()}
                />
                <Button
                  text={<AiOutlineRight />}
                  style="text-white bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleNext()}
                />
              </div>
            ) : (
              <div className="mt-5">
                <Button onClick={handleRestart} text="Try Again" style="text-white bg-blue-500 hover:bg-blue-600" />
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}

export default QuestionPage;
