/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import Question from './question';
import Options from './options';

function QuestionPage({ item, countDone }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
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

  const isQuizFinished = item && currentIndex === (item.length);

  useEffect(() => {
    if (item && item[currentIndex]) {
      const currentQuestion = item[currentIndex];
      const allAnswers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
      const shuffled = shuffleArray(allAnswers);
      setShuffledAnswers(shuffled);
    }
  }, [item, currentIndex]);

  console.log(result);
  console.log(answeredQuestions);

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2">
        {isQuizFinished ? (
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
      <div className="mt-5 w-1/2">
        {isQuizFinished ? null : (
          shuffledAnswers.map((answer, index) => (
            <Options
              key={index}
              answer={answer}
              answerOptions={answerOptions[index]}
              handleAnswer={handleAnswer}
              isSelected={selectedAnswer === answer}
            />
          ))
        )}
      </div>
      <div className="flex justify-between w-1/2 mt-5">
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
    </div>
  );
}

export default QuestionPage;
