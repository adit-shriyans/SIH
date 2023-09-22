import React from "react";
import "./App.css";
import Vata from "./Vata";
import Pitta from "./Pitta";
import Kapha from "./Kapha";
import Pittakapha from "./Pittakapha";
import Vatakapha from "./Vatakapha";
import Vatapitta from "./Vatapitta";

function Result({ results }) {
  // const aCount = results.filter((answer) => answer === "a").length;
  // const bCount = results.filter((answer) => answer === "b").length;
  // const cCount = results.filter((answer) => answer === "c").length;
  // const totals = [
  //   { label: "a", value: aCount },
  //   { label: "b", value: bCount },
  //   { label: "c", value: cCount },
  // ];

  // let dosha;

  // if (aCount > bCount && aCount > cCount) {
  //   dosha = <Vata />
  // } else if (bCount > aCount && bCount > cCount) {
  //   dosha = <Pitta />
  // }
  // else if (cCount > aCount && cCount > bCount) {
  //   dosha = <Kapha />
  // }
  // else if (aCount === bCount) {
  //   dosha = <Vatapitta />
  // } else if (bCount === cCount) {
  //   dosha = <Pittakapha />
  // }
  // else if (aCount === cCount) {
  //   dosha = <Vatakapha />
  // }
  // else {
  //   dosha = null;
  // }


  // console.log(totals);
  console.log(results);
  return (
    <div className="Result">
      <h1>RESULT</h1>
      <ul>
        {results.map((b, index) => (
          <li key={index}>{b ? "YES" : "NO"}</li>
        ))}
      </ul>
    </div>
  );
}

export default Result;
