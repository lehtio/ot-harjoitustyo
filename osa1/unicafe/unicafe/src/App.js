import { useState } from 'react'



const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistic = ({ text, value }) => (
  <tr>
    <th scope="row">{text}</th>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  // Only display statistics when feedback is given.
  if ((good + neutral + bad) === 0) 
  {
    return <p>No feedback given.</p>;
  } 
  else {
    return (
      <table>
        <tr>
         <th><Statistic text="Good" /></th> 
         <th><Statistic  value={good} /></th> 
        </tr>

        <tr>
          <th><Statistic text="Neutral" /></th> 
          <th><Statistic  value={neutral} /></th> 
        </tr>

        <tr>
         <th><Statistic text="bad" /></th> 
         <th><Statistic  value={bad} /></th> 
        </tr>

        <tr>
         <th><Statistic text="all" /></th> 
         <th><Statistic  value={all} /></th> 
        </tr>

        <tr>
         <th><Statistic text="average" /></th> 
         <th><Statistic  value={average} /></th> 
        </tr>

        <tr>
         <th><Statistic text="Positive (%)" /></th> 
         <th><Statistic  value={positive} /></th> 
        </tr>
         
      </table>
    );
  }
};

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const all = good + neutral + bad ;
  const average = (good+neutral*0 + bad*(-1))/(good + neutral + bad) ;
  const positive =  (good/ (good+neutral+bad))*100;
  const handleClick = () => {
 
  }


  return (
    <div>
      
      <h1> give feedback</h1>
      
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1> statistic</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive} 
      />
    </div>
  )
}

export default App