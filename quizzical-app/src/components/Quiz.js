import React from "react";
import { nanoid } from "nanoid";
import QuizQuestions from "./QuizQuestions";
import he from "he";

export default function Quiz() {
  const [questions, setQuestions] = React.useState([]);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [score, setScore] = React.useState(0);

  function newGame() {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          data.results.map((data) => {
            return {
              id: nanoid(),
              question: he.decode(data.question),
              options: [...data.incorrect_answers, data.correct_answer]
                .sort(() => Math.random() - 0.5)
                .map((option) => ({
                  id: nanoid(),
                  option: he.decode(option),
                })),
              correctAnswer: he.decode(data.correct_answer),
              selectAnswer: undefined,
            };
          })
        )
      );
  }

  React.useEffect(newGame, []);

  React.useEffect(() => {
    let count = 0;
    for (let que of questions) {
      for (let item of que.options) {
        if (item.id === que.selectAnswer && item.option === que.correctAnswer)
          count++;
      }
    }
    setScore(count);
  }, [showAnswer]);

  function selectAnswer(questionId, optionId) {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? { ...question, selectAnswer: optionId }
          : question
      )
    );
  }

  const quizElements = questions.map((question) => (
    <QuizQuestions
      key={question.id}
      quiz={question}
      selectAnswer={selectAnswer}
      showAnswer={showAnswer}
    />
  ));

  function checkAnswers() {
    setShowAnswer(true);
  }

  function playAgain() {
    setScore(0);
    setShowAnswer(false);
    newGame();
  }

  return (
    <div className="quiz">
      {quizElements}
      {showAnswer ? (
        <div className="score-page">
          <p className="score-text">You scored {score}/5 correct answers</p>
          <button className="play-again-btn" onClick={playAgain}>
            Play Again
          </button>
        </div>
      ) : (
        <button className="check-answers-btn" onClick={checkAnswers}>
          Check Answers
        </button>
      )}
    </div>
  );
}
