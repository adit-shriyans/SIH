import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Welcome from "./Welcome";
import Questions from "./Questions";
import QuestionCodes from "./constants/QuestionCodes";
import Result from "./Result";
import PrakritiReport from "./PrakritiReport";
import Navbar from "./Navbar";

function App() {
  let [appState, setAppState] = useState("welcome");
  let [results, setResults] = useState([]);
  const [outputs, setOutputs] = useState({});
  const [prediction, setPrediction] = useState();
  let output;

  if (appState === "welcome") {
    output = <Welcome setAppState={setAppState} />;
  } else if (appState === "questions") {
    output = <Questions setAppState={setAppState} setResults={setResults} />;
  } else {
    output = <PrakritiReport prediction={prediction} />;
  }

  for (let i = 0; i < results.length; i++) {
    outputs[QuestionCodes[i]] = results[i].selected;
  }

  const jsonString = JSON.stringify(outputs);

  // "https://prakriti.onrender.com"
  // "http://localhost:8000"
  if (jsonString.length > 2) {
    axios
      .post("http://localhost:8000", jsonString, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response from server:", response.data);
        setPrediction(response.data.prediction);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  }

  return (
    <div className="App">
      <Navbar />
      {output}
    </div>
  );
}

export default App;
