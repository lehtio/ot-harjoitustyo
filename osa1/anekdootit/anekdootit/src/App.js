import React,{useState} from 'react'

const Button = ({ text,clickAction }) => {
  return(
  <button onClick={clickAction}>{text}</button>
  )
  }

const Paragraph = ({text}) => {
  return(
    <p>{text}</p>
  )
}
const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.']

  const [selected,setSelected] = useState(0)
  const [vote,setVote] = useState(new Array(8).fill(0));

  
  const updateVotes = () => {
    const copy = [...vote]
    copy[selected]+=1
    setVote(copy)
  }
  const getnextAnecdote = () => {
    const luku = Math.floor((Math.random()*anecdotes.length)+0)
    setSelected(luku)
  }

  const maksimiaani = Math.max(...vote)
  const maxanekdootti = anecdotes[vote.indexOf(maksimiaani)]

  return (
      <div>
      <h2>Anecdote of the day </h2>
      <Paragraph text={anecdotes[selected]} />
      <p>has {vote[selected]} votes</p>
      <Button text={"next anekdootti"} clickAction={getnextAnecdote} />
      <Button text={"vote"} clickAction={updateVotes} />
      <h2> Anecdote with the most votes</h2>
      <Paragraph text={maxanekdootti} />
      <p>has {maksimiaani} votes</p>
      </div>
  );
}

export default App;