import React from 'react'
import Navbar from './Navbar'
import "./PrakritiReport.css"

const PrakritiReport = () => {
  return (
    <div>
        <Navbar />
        <section className='Report'>
            <div className='PrakritiContainer'>
                 <h2 className='PrakritiName'>Vata</h2>
            </div>
            <div className='Report-details-div'>
                <p className='Report-details-text'>
                    hello,this is text.
                </p>
            </div>
            <div className='Recommendation-div'>
                <h1 className='Recommendation-heading'>Recommendation</h1>
                <button className='Diet-btn'>Diet Plannig</button>
                <button className='Life-btn'>Lifestyle Planning</button>
                <input 
                type="text" 
                placeholder="type what you want to know!" 
                className='recommendation-input'
                >
                </input>
            </div>
        </section>
    </div>
  )
}

export default PrakritiReport