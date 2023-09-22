import "./App.css";
import  { useState, useEffect } from "react";
import Welcome from "./Welcome";
import Questions from "./Questions";
import Result from "./Result";
import Navbar from "./Navbar"
import PrakritiReport from "./PrakritiReport";


function App() {
  let [appState, setAppState] = useState("welcome");
  let [results, setResults] = useState([]);

  let output;
  if (appState === "welcome") {
    output = <Welcome setAppState = {setAppState}/>;
  } else if (appState === "questions") {
    output = <Questions setAppState={setAppState} setResults={setResults}/>;
  } else {
    output = <Result results={results} />
  }

  return (
    <div className="App">
      {/* <Navbar />
    {output} */}
    <PrakritiReport />
    </div>
  );
}

export default App;
