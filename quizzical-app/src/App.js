import React from "react";
import StartPage from "./components/StartPage";
import Quiz from "./components/Quiz";

export default function App() {
  const [start, setStart] = React.useState(false);

  function startQuiz() {
    setStart((prevStart) => !prevStart);
  }

  return (
    <div className="container">
      {!start ? <StartPage startQuiz={startQuiz} /> : <Quiz />}
    </div>
  );
}
