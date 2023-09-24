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
  const [responseValue, setResponseValue] = useState(null);
  let output;

  if (appState === "welcome") {
    output = <Welcome setAppState={setAppState} />;
  } else if (appState === "questions") {
    output = <Questions setAppState={setAppState} setResults={setResults} />;
  } else {
    output = <PrakritiReport prakriti={"Vata"} outputs={outputs} content={"Dori me Interimo, adapare Dori me Ameno, Ameno Latire Latiremo Dori me Ameno Omenare imperavi ameno Dimere, dimere matiro Matiremo Ameno Omenare imperavi emulari, ameno Omenare imperavi emulari, ameno"} />;
  }

  for (let i = 0; i < results.length; i++) {
    outputs[QuestionCodes[i]] = results[i].selected;
  }

  const jsonString = JSON.stringify(outputs);

  console.log(jsonString);

  // Send the POST request to your server
  // axios
  // .post('http://localhost:8000/', jsonString, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })
  // .then((response) => {
  //   // Handle the response from the server
  //   setResponseValue(response.data); // Assuming the response is an integer
  // })
  // .catch((error) => {
  //   console.error('Error sending data:', error);
  // });
  // fetch('http://localhost:8000', {
  //   method: 'POST',
  //   mode: 'cors',
  //   body: jsonString
  // })
  // .then((response) => {
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return response.json(); // Assuming the response is JSON
  // })
  // .then((data) => {
  //   // Handle the response data here
  //   setResponseValue(data);
  // })
  // .catch((error) => {
  //   console.error('Error:', error);
  // });


  // axios.post("http://localhost:8000", (
  //   jsonString
  // ))
  // .then(res => (
  //   console.log(res.data)
  // ))
  // .catch((error) => {
  //     console.error('Error:', error);
  //   });
  console.log(results);
  if(jsonString.length>2){
  axios
  .post("http://localhost:8000", jsonString, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    console.log("Response from server:", response.data);
    // Assuming the response is an integer, you can use setResponseValue if needed
    // setResponseValue(response.data);
  })
  .catch((error) => {
    console.error("Error sending data:", error);
  });
}


    // fetch("http://localhost:8000",{
    //   method: "POST",
    //   headers: {
    //   'Content-Type': 'application/json',
    // },
    //   body: jsonString
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });


  return (
    <div className="App">
      <Navbar />
      {output}
    </div>
  );
}

export default App;
