import React, { useState, useEffect } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./App.css";

function Questions(props) {
  const quizQuestions = [
    {
      id: 0,
      question: "How would you describe your body type and how you look?",
      options: [
        {
          label:
            "I am thin, lanky, and slender with prominent joints and thin muscles",
          value: "a",
        },
        {
          label:
            "I have a medium, symmetrical build with good muscle development",
          value: "b",
        },
        { label: "I have a broad and full build", value: "c" },
      ],
    },
    {
      id: 1,
      question: "How would you best describe your metabolism?",
      options: [
        { label: "Fast metabolism, difficult to gain weight", value: "a" },
        {
          label: "Balanced metabolism, your weight stays fairly consistent",
          value: "b",
        },
        { label: "Slow metabolism, tendency to gain weight", value: "c" },
      ],
    },
    {
      id: 2,
      question: "Which best describes your skin?",
      options: [
        {
          label: "My skin is dry, thin, and prone to wrinkles, it tans easily",
          value: "a",
        },
        { label: "My skin is prone to irritation", value: "b" },
        { label: "My skin is thick, moist, and smooth", value: "c" },
      ],
    },
    {
      id: 3,
      question: "Which best describes your hair?",
      options: [
        { label: "My hair is dry, brittle or frizzy", value: "a" },
        {
          label:
            "My hair is fine with a tendency towards early thinning or graying",
          value: "b",
        },
        { label: "I have abundant, thick and oily hair.", value: "c" },
      ],
    },
    {
      id: 4,
      question: "Which best describes your eyes?",
      options: [
        { label: "My eyes are small and active", value: "a" },
        { label: "I have a deep and intentional gaze", value: "b" },
        { label: "I have large pleasant eyes", value: "c" },
      ],
    },
    {
      id: 5,
      question: "Which best describes how you talk?",
      options: [
        { label: "Fast and/or a lot!", value: "a" },
        { label: "My words are sharp and concise", value: "b" },
        { label: "My speech is slow and calm", value: "c" },
      ],
    },
    {
      id: 6,
      question: "What is your sleep pattern like?",
      options: [
        {
          label: "I am a light sleeper with a tendency to awaken easily",
          value: "a",
        },
        {
          label:
            "I am a moderately sound sleeper, usually needing less than eight hours to feel rested",
          value: "b",
        },
        {
          label:
            "My sleep is deep and long. I tend to awaken slowly in the morning",
          value: "c",
        },
      ],
    },
    {
      id: 7,
      question: "How would you describe your body temperature?",
      options: [
        {
          label:
            "My hands and feet are usually cold and I prefer warm environments",
          value: "a",
        },
        {
          label:
            "I am usually warm, regardless of the season, and prefer cooler environments",
          value: "b",
        },
        {
          label:
            "I am adaptable to most temperatures but do not like cold, wet days.",
          value: "c",
        },
      ],
    },
    {
      id: 8,
      question: "Which best describes your personality?",
      options: [
        {
          label: "I am lively and enthusiastic by nature. I like to change",
          value: "a",
        },
        {
          label: "I am purposeful and intense. I like to convince",
          value: "b",
        },
        {
          label: "I am easy going and accepting. I like to support",
          value: "c",
        },
      ],
    },
    {
      id: 9,
      question: "How do you react to stress?",
      options: [
        { label: "I get anxious, confused, worried", value: "a" },
        { label: "I am easily irratable or aggressive", value: "b" },
        { label: "I remain calm and like to withdraw", value: "c" },
      ],
    },
    {
      id: 10,
      question: "How best describes your memory?",
      options: [
        {
          label: "I have good short-term memory but easily forget",
          value: "a",
        },
        { label: "I have good medium-term memory", value: "b" },
        {
          label:
            "It takes me longer to grasp things but I have good long-term memory",
          value: "c",
        },
      ],
    },
  ];

  let [id, setId] = useState(0);
  let [selected, setSelected] = useState(null);
  let [history, setHistory] = useState([]);
  let [editModes, setEditModes] = useState(new Array(quizQuestions.length).fill(false)); // State variable to track edit mode for each question
  const [answers, setAnswers] = useState([]);
  const [inputs, setNewAns] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
      console.log("OK");
      console.log(inputs);
      console.log(answers);
      nextClick();
  }, [inputs, answers]);

  useEffect(() => {
    props.setResults(answers);
  }, [answers]);

  function nextClick() {
    if (answers.length >= quizQuestions.length ) {
      props.setAppState("result");
      props.setResults(history);
      return;
    }
    if(answers.length===0) return;
    if(input==="") return;

    setHistory([...history, { id, selected }]);
    setSelected(null);
    setId(id+1);
    setInput("");
  }

  const reAnswer = (questionId) => {
    const newEditModes = [...editModes];
    newEditModes[questionId] = true;
    setEditModes(newEditModes);
  };

  function editAnswer(input, id) {
    const newEditModes = [...editModes];
    answers[id]=input;
    newEditModes[id] = false;
    setEditModes(newEditModes);
    setInput("");
  }

  function getOptions(newAns) {
    setInput([...inputs, newAns]);
    setAnswers([...answers, newAns]);
  }

  let currentQuestion = quizQuestions.find((item) => item.id === id);

  return (
    <div className="Questions">
      <div className="question-container">
        <div className="heading">PRAKRITI CHATBOT</div>
      <section className="history">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <p className="prevQ">
              {quizQuestions.find((itm) => itm.id === item.id).question}
            </p>
            <div className="ans-div">
              {editModes[item.id] ? (
                <ValidatorForm onSubmit={() => editAnswer(input, item.id)}>
                <TextValidator
                  className="textfield" 
                  label="Standard" 
                  onChange={(evt) => setInput(evt.target.value)}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  value={input}
                />
                <Button variant="contained" type="submit" color="success">
                  Submit response
                </Button>
                </ValidatorForm>
              ) : (
                <>
                  <p className="prevA">
                    {
                      answers[item.id]
                    }
                    <EditNoteIcon
                      className="btn--edit"
                      onClick={() => reAnswer(item.id)}
                    />
                  </p>
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
            <ValidatorForm onSubmit={() => getOptions(input)}>
              <TextValidator
                className="textfield" 
                label="Standard" 
                onChange={(evt) => setInput(evt.target.value)}
                validators={['required']}
                errorMessages={['this field is required']}
                value={input}
              />
              <Button className="btn--submit" variant="contained" type="submit" color="success">
                Submit response
              </Button>
            </ValidatorForm>
          </div>
        </section>
      </div>
      </div>
    </div>
  );
  
}

export default Questions;
