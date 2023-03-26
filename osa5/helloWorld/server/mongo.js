const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give password as argument.');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://reijjo:${password}@cluster0.0npwagm.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
	content: 'CSS is VERYVERY hard',
	important: true,
})

note.save().then(result => {
	console.log('note saved!', result)
	mongoose.connection.close()
})

Note.find({ important: true }).then(res => {
  res.forEach(note => {
    console.log('Important notes', note)
  })
  mongoose.connection.close()
})

Note.find({}).then(res => {
  res.forEach(note => {
    console.log('notes', note)
  })
  mongoose.connection.close()
})