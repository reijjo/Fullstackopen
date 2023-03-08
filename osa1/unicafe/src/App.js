import { useState } from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticsLine = (props) => {
  const { all, text } = props;
  const value = text === 'positive' ? `${all} %` : all;
  return (
    <td>{text} {value}</td>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad, all, avg } = props
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <StatisticsLine text='good' all={good} />
          </tr>
          <tr>
            <StatisticsLine text='neutral' all={neutral} />
          </tr>
          <tr>
            <StatisticsLine text='bad' all={bad} />
          </tr>
          <tr>
            <StatisticsLine text='all' all={all} />
          </tr>
          <tr>
            <StatisticsLine text='average' all={(avg / all).toFixed(1)} />
          </tr>
          <tr>
            <StatisticsLine text='positive' all={((good / all) * 100).toFixed(1)}/>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [avg, setAvg] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAvg(avg + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAvg(avg - 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h1>statistics</h1>
      {all === 0 ? (
        <>
          No feedback given
        </>
      ) : (
        <>
          <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} />
        </>
      )}

    </div>
  )
}

export default App;
