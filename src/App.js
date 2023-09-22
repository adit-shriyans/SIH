import "./App.css";
import  { useState, useEffect } from "react";
import Welcome from "./Welcome";
import Questions from "./Questions";
import Result from "./Result";
import PrakritiReport from "./PrakritiReport";
import Navbar from "./Navbar"


function App() {
  let [appState, setAppState] = useState("welcome");
  let [results, setResults] = useState([]);

  let output;
  if (appState === "welcome") {
    output = <Welcome setAppState = {setAppState}/>;
  } else if (appState === "questions") {
    output = <Questions setAppState={setAppState} setResults={setResults}/>;
  } else {
    output = <PrakritiReport />
  }

  return (
    <div className="App">
      <Navbar />
    {output}
    </div>
  );
}

export default App;
