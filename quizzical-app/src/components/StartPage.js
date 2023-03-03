import React from "react";

export default function StartPage(props) {
  return (
    <div className="start-page">
      <h1 className="start-title">Quizzical</h1>
      <p className="start-text">Click the below button to start the quiz.</p>
      <button onClick={props.startQuiz} className="start-quiz-btn">
        Start Quiz
      </button>
    </div>
  );
}
