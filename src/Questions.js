import React, { useState, useEffect, useRef } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import TextField from '@mui/material/TextField';
import QuestionSet from "./constants/questionSetPrompt";
import logo from "./assets/logoNew.png";
import "./App.css";
import "./Questions.css"
import axios from "axios";

const apiUrl = 'https://example.com/api/resource';

var prakriti;

axios.get(apiUrl)
      .then(response => {
        console.log('Response:', response.data);
        prakriti = response.data;
      })
      .catch(error =>{
        console.log("Error:", error)
});      

function Questions(props) {
  const quizQuestions = QuestionSet;

  let [id, setId] = useState(0);
  let [selected, setSelected] = useState(null);
  let [history, setHistory] = useState([]);
  let [editModes, setEditModes] = useState(new Array(quizQuestions.length).fill(false)); // State variable to track edit mode for each question
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (selected !== null) {
      nextClick();
    }
  }, [selected]);

  useEffect(() => {
    props.setResults(answers);
  }, [answers]);

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const scrollableRef = useRef(null);

  // Function to scroll to the bottom of the scrollable element
  const scrollToBottom = () => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  };

  function nextClick() {
    if (selected === null) {
      return;
    }
    if (id + 1 > quizQuestions.length - 1) {
      props.setAppState("result");
      props.setResults(history);
      return;
    }

    console.log(answers);
    setHistory([...history, { id, selected }]);
    setSelected(null);
    setId(id + 1);
  }

  function handleClick(option) {
    setSelected(option?"YES":"NO");
    setAnswers([...answers, option]);
  }

  const reAnswer = (questionId) => {
    const newEditModes = [...editModes];
    newEditModes[questionId] = true;
    setEditModes(newEditModes);
  };

  function editAnswer(option, id) {
    const newEditModes = [...editModes];
    const newAnswers = [...answers];
    const newHistory = [...history];
    newAnswers[id] = option;
    newHistory[id] = {id:id, selected: newAnswers[id]?"YES":"NO" }
    console.log(answers);
    console.log(newAnswers);
    console.log(newHistory);
    // answers[id]=option.value;
    newEditModes[id] = false;
    setEditModes(newEditModes);
    setAnswers(newAnswers);
    setHistory(newHistory);
  }

  let currentQuestion = quizQuestions.find((item) => item.id === id);

  return (
    <div className="Questions">
      <div className="question-container">
      <section className="history" ref={scrollableRef}>
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <p className="prevQ">
              {quizQuestions.find((itm) => itm.id === item.id).question}
            </p>
            <div className="ans-div">
              {editModes[item.id] ? (

                // quizQuestions[item.id].options.map((option, index) => (
                //   <button
                //     key={index}
                //     className={
                //       selected === option.value
                //         ? "Question-btn-selected Question-btn"
                //         : "Question-btn"
                //     }
                //     onClick={() => editAnswer(option, item.id)}
                //   >
                //     {option.label}
                //   </button>
                // ))
                <>
                <button className="Question-btn" onClick={() => editAnswer(true, item.id)}>
                  YES
                </button>
                <button className="Question-btn" onClick={() => editAnswer(false, item.id)}>
                  NO
                </button>
                </>
              ) : (
                // Display the previous answer and Edit icon
                <>
                  <p className="prevA">
                    {
                      // quizQuestions[item.id].options.find(
                      //   (option) => option === item.selected
                      // ).label
                      answers[item.id]?"YES":"NO"
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
        <section className="Question-btns">
          <div className="QuestionWithImg">
          <img src={logo} className="logo"/>
          <h3 className="Question-1">
            {currentQuestion.question}
          </h3>
          </div>
          <div className="option-buttons">
            {/* {currentQuestion.options.map((option, index) => (
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
            ))} */}
            <button className="Question-btn" onClick={() => handleClick(true)}>
              YES
            </button>
            <button className="Question-btn" onClick={() => handleClick(false)}>
              NO
            </button>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
  
}

export default Questions;
