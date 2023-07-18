const Course = ({ course }) => {
    return (
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </div>
    )
  }
  const Header = (props) => (
    <h1>{props.name}</h1>
    
  )
  
   
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => (
          <Part key={part.id} content={part.name} maara={part.exercises} />
        ))}
  
        <Total parts={props.parts} />
      </div>
    )}
  
  
   const Part=(props) => {
    return <p> {props.content} {props.maara}</p>
    }
  
    const Total = (props) => {
      const summa = props.parts.reduce((s, p) => {
        return s + p.exercises;
      }, 0)
      return <p>Yhteensä {summa} tehtävää</p>;
    }
   
   
  export default Course