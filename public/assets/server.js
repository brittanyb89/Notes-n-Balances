const express = require('express');
const path = require('path');
const { join } = require('path');
const fs = require('fs');
// import cors from "cors";
// import noteData from "../db/db.json" assert { type: "json" };

// Start express
const app = express();

// Set up port
const PORT = process.env.PORT || 3001;

// Use UUID to generate unique IDs for each note
const { v4: uuidv4 } = require('uuid');

uuidv4();

// Middleware
// Parse incoming string or array data; for HTML forms
app.use(express.urlencoded({ extended: true }));
// Parse incoming JSON data
app.use(express.json());
// Use the public folder to serve static files
app.use(express.static('public'));

// Create a GET /notes route that returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(join(__dirname, '../notes.html'));
});

// Create a GET * route that returns index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Use the db.json on back-end to store and retrieve notes using the fs module
const readFromFile = ('./db/db.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(JSON.parse(data));
});

const writeToFile = (destination, content) => {
    fs.writeFile
}
// API routes
// Create a GET /api/notes route that reads the db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Create a POST /api/notes route that receives a new note to save on the request body, 
// adds it to the db.json file, and then returns the new note to the client
app.post('/api/notes', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const addNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        readFromFile('./db/db.json')
            .then((data) => JSON.parse(data))
            .then((json) => [...json, addNote])
            .then((result) => writeToFile('./db/db.json', result));
    } else {
        res.error('Error in posting note');
    }
});

// BONUS: Create a DELETE /api/notes/:id route that receives a query parameter containing the id of a note to delete
// In order to delete a note, you'll need to read all notes from the db.json file 
// Remove the note with the given id property
// Then rewrite the notes to the db.json file.

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    console.log(noteId);
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.id !== noteId);
            writeToFile('./db/db.json', result);
        });
});

app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});