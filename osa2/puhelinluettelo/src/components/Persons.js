const Persons = ({ persons, filter }) => {
	const filteredPersons = filter === ''
		? persons
		: persons.filter((person) => {
		return person.name.toLowerCase().includes(filter)
	})

	return (
		<>
			{filteredPersons.map(nimi => (
				<p key={nimi.name}>{nimi.name} {nimi.number}</p>
			))}
		</>
	)
}

export default Persons;
