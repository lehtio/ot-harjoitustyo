const Person = ({ person, toggleImportance }) => {
    const label = person.important ? 'make not important' : 'make important'
    return (
      <li className='person'>
        {person.content} 
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
  }
  
  export default Person