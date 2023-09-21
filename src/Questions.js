import React, { useState, useEffect } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TextField from '@mui/material/TextField';
import QuestionSet from "./QuestionSet";
import "./App.css";

function Questions(props) {
  const quizQuestions = QuestionSet;

  let [id, setId] = useState(0);
  let [selected, setSelected] = useState(null);
  let [history, setHistory] = useState([]);
  let [editModes, setEditModes] = useState(new Array(quizQuestions.length).fill(false)); // State variable to track edit mode for each question
  const [answers, setAnswers] = useState([]);
  // Define quizQuestions here
  // const quizQuestions = [
  //   {
  //     id: 0,
  //     question: "How would you describe your body type and how you look",
  //     // ...
  //   },
  //   {
  //     id: 1,
  //     question: "How would you best describe your metabolism",
  //     // ...
  //   },
  //   // ... (other questions)
  // ];

  useEffect(() => {
    if (selected !== null) {
      nextClick();
    }
  }, [selected]);

  useEffect(() => {
    props.setResults(answers);
  }, [answers]);

  function nextClick() {
    if (selected === null) {
      return;
    }
    if (id + 1 > quizQuestions.length - 1) {
      props.setAppState("result");
      props.setResults(history);
      return;
    }

    setHistory([...history, { id, selected }]);
    setSelected(null);
    setId(id + 1);
  }

  function handleClick(option) {
    setSelected(option.value);
    setAnswers([...answers, option.value]);
  }

  const reAnswer = (questionId) => {
    const newEditModes = [...editModes];
    newEditModes[questionId] = true;
    setEditModes(newEditModes);
  };

  function editAnswer(option, id) {
    const newEditModes = [...editModes];
    answers[id]=option.value;
    newEditModes[id] = false;
    setEditModes(newEditModes);
  }

  let currentQuestion = quizQuestions.find((item) => item.id === id);

  return (
    <div className="Questions">
      <section className="history">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <p className="prevQ">
              {quizQuestions.find((itm) => itm.id === item.id).question}
            </p>
            <div className="ans-div">
              {editModes[item.id] ? (
                // Display options for editing the answer
                quizQuestions[item.id].options.map((option, index) => (
                  <button
                    key={index}
                    className={
                      selected === option.value
                        ? "Question-btn-selected Question-btn"
                        : "Question-btn"
                    }
                    onClick={() => editAnswer(option, item.id)}
                  >
                    {option.label}
                  </button>
                ))
              ) : (
                // Display the previous answer and Edit icon
                <>
                  <p className="prevA">
                    {
                      quizQuestions[item.id].options.find(
                        (option) => option.value === item.selected
                      ).label
                    }
                    <EditNoteIcon
                      className="btn--edit"
                      onClick={() => reAnswer(item.id)}
                    />
                  </p>
                  {/* Optionally, show a Submit button when in edit mode */}
                  {/* {editModes[item.id] && (
                    <button
                      className="submit-btn"
                      onClick={() => submitEditedAnswer(item.id)}
                    >
                      Submit
                    </button>
                  )} */}
                </>
              )}
            </div>
          </div>
        ))}
      </section>
      <div className="container">
        <section className="question-number">
          <p>
            Question {id + 1} of {quizQuestions.length}
          </p>
        </section>
        <section className="Question-btns">
          <h3 className="Question-1">{currentQuestion.question}</h3>
          <div>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={
                  selected === option.value
                    ? "Question-btn-selected Question-btn"
                    : "Question-btn"
                }
                onClick={() => handleClick(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
  
}

export default Questions;
