import React from 'react';

const Header = (props) => (
  <h1>{props.name}</h1>
  
)
 const Part=(props) => {
  
  return <p> {props.content} {props.maara}</p>
  }
 
 
 const Content=(props) => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  return (
    <div>
      
     <Part content={part1} maara={exercises1} />
     <Part content={part2} maara={exercises2}/>
     <Part content={part3} maara={exercises3} />
    </div>
  )
 }
 const Total=(props) => {
  
  let yhteensa = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <>
      <p>Number of exercises {yhteensa} </p>
    </>
  )
 }
 
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App