/* eslint-disable no-console */
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Give password as an argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://hector:${password}@cluster0.ofw6a8q.mongodb.net/testNoteApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);

console.log(`connecting to ${url}`);
mongoose
  .connect(url)
  .then(() => {
    console.log('connected succesfully');
  })
  .catch(() => {
    console.log("couldn't connect to DB");
    process.exit(1);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

const note = new Note({
  content: 'Testing note 2',
  important: false,
});

note.save().then(() => {
  console.log('note saved');
  mongoose.connection.close();
});

Note.find({}).then((results) => {
  console.log('Notes: ');
  results.forEach((n) => {
    console.log(n);
  });
  mongoose.connection.close();
});
