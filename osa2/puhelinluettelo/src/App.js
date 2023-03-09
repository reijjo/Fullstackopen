import { useState, useEffect } from 'react'
import personService from './services/persons';

import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if (persons.some(dobbel => dobbel.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
			personService
			.create(nameObject)
			.then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
			})
    }
      setNewName('')
      setNewNumber('')
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        addName={addName} newName={newName} handleName={handleName}
        newNumber={newNumber} handleNumber={handleNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )

}

export default App
