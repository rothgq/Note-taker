const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
//Import helpers
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);
//POST route to make and save a note
notes.post('/', (req, res) => {
//body referenced in db.json from test title and test text   
    const { title, text } = req.body;
//If all  required properties are present:
    if (title && text) {
    //New variable for the object being saved:
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');
        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Error in posting note')
    }
});
//DELETE route for a specific note:
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            //new array of notes minus the one provided
            const result = json.filter((note) => note.note_id !== noteId);
            //Save new array to db.json
            writeToFile('./db/db.json', result);
            res.json(`Item ${noteId} has been deleted`);
        })
});

module.exports = notes;