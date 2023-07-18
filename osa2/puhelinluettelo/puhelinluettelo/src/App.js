import { useState, useEffect } from 'react';
import axios from 'axios';
import personService from './services/persons';

import Person from './components/Person';

const FilterForm = ({ filter, handleFilterChange }) => {
  return (
    <form>
      <div>
        filter shown with: <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
  );
};

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

const PersonList = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id ? person.id : person.name + person.number}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

 const [errorMessage, setErrorMessage] = useState('')
  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  
  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      const confirmation = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      );
      if (confirmation) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) => (person.id !== existingPerson.id ? person : returnedPerson))
            );
            setNewName('');
            setNewNumber('');
            setNotification(`${newName}'s number was updated.`);
            setTimeout(() => {
              setNotification(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
            setError('Failed to update the contact.');
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      axios.post('http://localhost:3001/persons', newPerson).then((response) => {
        newPerson.id = response.data.id;
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
        setNotification(`${newName} was added to the phonebook.`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      }).catch((error) => {
        console.log(error);
        setError('Failed to add the contact.');
      });
    }
  };
  

  const deletePerson = (id) => {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to delete the contact.');
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    setErrorMessage(`${newName} yhteystieto on poistettu`)
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
    setErrorMessage(`${newName} numeroa on muutettu`)
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setShowAll(false);
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    return (
      <div className="error">
        {message}
      </div>
    );
  };

  const personsToShow = showAll
    ? persons
    : persons.filter(
        (person) =>
          (person.name && person.name.toLowerCase().includes(filter.toLowerCase())) ||
          (person.number && person.number.toLowerCase().includes(filter.toLowerCase()))
      );

  return (
    <div>
      <Notification message={errorMessage} />
      <h1>Phonebook</h1>
      <FilterForm filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new contact</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <PersonList persons={personsToShow} deletePerson={deletePerson} />
      
      
    </div>
  );
};

export default App;
