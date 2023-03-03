import React from "react";

export default function QuizQuestions(props) {
  function optionStyle(id, option) {
    if (props.showAnswer) {
      if (props.quiz.correctAnswer === option)
        return { backgroundColor: "#94D7A2", border: "none" };
      else if (props.quiz.selectAnswer === id)
        return { backgroundColor: "#F8BCBC", opacity: "0.5", border: "none" };
      else return { backgroundColor: "white", opacity: "0.5" };
    }
    return props.quiz.selectAnswer === id
      ? { backgroundColor: "#D6DBF5", border: "none" }
      : { backgroundColor: "white" };
  }

  const optionsElements = props.quiz.options.map((item) => {
    return (
      <button
        key={item.id}
        className="quiz-option-btn"
        onClick={props.selectAnswer.bind(this, props.quiz.id, item.id)}
        style={optionStyle(item.id, item.option)}
      >
        {decodeURIComponent(item.option)}
      </button>
    );
  });

  return (
    <div className="quiz-component">
      <h2 className="quiz-question">
        {decodeURIComponent(props.quiz.question)}
      </h2>
      <h3 className="quiz-options">{optionsElements}</h3>
      <hr />
    </div>
  );
}
