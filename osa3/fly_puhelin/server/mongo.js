const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('Give password as argv 2');
	process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://reijjo:${password}@cluster1.qsafdct.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema);

const person = new Person({
	name: name,
	number: number
})

if (process.argv.length > 3) {
	person.save().then(res => {
		console.log('added', res.name, 'number', res.number, 'to phonebook')
		mongoose.connection.close()
	})
}
else if (process.argv.length === 3) {
	Person.find({}).then(res => {
		console.log('phonebook:')
		res.forEach(person => {
			console.log(person.name, person.number)
		})
		mongoose.connection.close()
	})
}