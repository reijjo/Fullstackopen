import { useState, useEffect } from 'react'
import personService from './services/persons';

import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('')
	const [info, setInfo] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

	console.log('idt', persons.length)

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 5
    }
    if (persons.some(dobbel => dobbel.name === newName && dobbel.number === newNumber)) {
      setInfo({
				message: `${newName} is already added to phonebook`,
				style: { color: 'red'}
			})
			setTimeout(() => {
				setInfo(null)
			}, 3000)
    }
    else if (persons.some(dobbel => dobbel.name === newName && dobbel.number !== newNumber)) {
			const oldNum = persons.find(p => p.name === newName)
			if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
				const newNum = { ...oldNum, number: newNumber}
				personService
				.updateNumber(oldNum.id, newNum)
				.then(returnedPerson => {
					setPersons(persons.map(person => person.id !== oldNum.id ? person : returnedPerson))
					setInfo({
						message: `Updated ${newName}'s number.`,
						style: { color: 'blue' }
					})
					setTimeout(() => {
						setInfo(null)
					}, 3000)
				})
				.catch(error => {
					setInfo({
						message: `Information of ${newName} has already been removed from server.`,
						style: { color: 'red' }
					})
				})
				setTimeout(() => {
					setInfo(null)
				}, 3000)
			}
		}
    else {
			personService
			.create(nameObject)
			.then(returnedPerson => {
				console.log('retper', returnedPerson)
				setPersons(persons.concat(returnedPerson))
				setInfo({
					message: `Added ${newName}`,
					style: { color: 'green' }
				})
				setTimeout(() => {
					setInfo(null)
				}, 3000)
			})
    }
      setNewName('')
      setNewNumber('')
  }

	const delUser = (id) => {
		const personsName = persons.find(person => person.id === id)
		console.log(personsName.name)
		if (window.confirm(`Delete ${personsName.name} ?`)) {
			personService
			.deleteUser(id)
			.then(() => {
				    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
				setInfo({
					message: `Deleted ${personsName.name}`,
					style: { color: 'red' }
				})
				setTimeout(() => {
					setInfo(null)
				}, 3000)
      })
			})
		}
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
			<Notification message={info} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        addName={addName} newName={newName} handleName={handleName}
        newNumber={newNumber} handleNumber={handleNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} delUser={delUser} />
    </div>
  )

}

export default App
