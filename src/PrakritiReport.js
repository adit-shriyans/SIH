import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './PrakritiReport.css';
import PrakritiBorder from './assets/dec.png';
import Details from './constants/Details';

const PrakritiReport = (props) => {
  const prakritiOrder = ['Kapha', 'Pitta', 'Vata'];
  const pr = prakritiOrder[props.prediction];
  const [loading, setLoading] = useState(true); // Add loading state
  const [prakritiData, setPrakritiData] = useState(null); // Add state to store prakriti data

  useEffect(() => {
    // Simulate an API call (replace this with your actual API call)
    setTimeout(() => {
      const prakritiData = Details[pr];
      setPrakritiData(prakritiData);
      setLoading(false); // Set loading to false when data is fetched
    }, 1000); // Simulate a 1-second delay
  }, [pr]);

  if (loading || !prakritiData) {
    // While loading, render a loading page or spinner
    return (
    <div>
        <section className="Report">
        <div className="PrakritiContainer">
          <img src={PrakritiBorder} className="PrakritiBorder" alt="Prakriti Border" />
          <h1 className="PrakritiName">Loading...</h1>
        </div>
      </section>
    </div>); // You can replace this with your own loading component
  }

  const { name, content } = prakritiData;

  return (
    <div>
      {/* <Navbar /> */}
      <section className="Report">
        <div className="PrakritiContainer">
          <img src={PrakritiBorder} className="PrakritiBorder" alt="Prakriti Border" />
          <h1 className="PrakritiName">{name}</h1>
        </div>
        <div className="Report-details-div">
          <p className="Report-details-text">{content}</p>
        </div>
        <div className="Recommendation-div">
          <h1 className="Recommendation-heading">Recommendations:</h1>
          <div className="Plans">
            <button className="Diet-btn btn">Diet Planning</button>
            <button className="Life-btn btn">Lifestyle Planning</button>
          </div>
          <input
            type="text"
            placeholder="Type what you want to know!"
            className="recommendation-input"
          />
        </div>
      </section>
    </div>
  );
};

export default PrakritiReport;
