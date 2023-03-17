
const Persons = ({ persons, filter, delUser }) => {
	const filteredPersons = filter === ''
		? persons
		: persons.filter((person) => {
		return person.name.toLowerCase().includes(filter)
	})


	return (
		<>
			{filteredPersons.map(nimi => (
					<p
						key={nimi.name}
					> {nimi.name} {nimi.number}
						<button onClick={() => delUser(nimi.id)}>delete</button>
					</p>
			))}
		</>
	)
}

export default Persons;
