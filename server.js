const express = require('express');
const path = require('path');
const fs = require('fs');
const { join } = require('path');
// generate unique id for each note
const { v4: uuidv4 } = require('uuid');
uuidv4();
const util = require('util');

// Set up Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Parse incoming string or array data; for HTML forms
app.use(express.urlencoded({ extended: true }));
// Parse incoming JSON data
app.use(express.json());
// Use the public folder to serve static files
app.use(express.static(__dirname + '/public'));

// global array using promise to read JSON file
const noteData = util.promisify(fs.readFile);

function getNoteData() {
    console.log("Getting note data", noteData("./db/db.json", "utf8"));
    return savedNotes = noteData("./db/db.json", "utf8");
}

// Create a GET /notes route that returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});



// API route that read db.json file and returns all saved notes as JSON
app.get('/api/notes', (req, res) => {
    getNoteData().then((savedNotes) => {
        res.json(JSON.parse(savedNotes))
    })
    .catch((err) => res.status(500).json(err));
});

// recieve a note to save on the request body, add it to the db.json file, and then return the new note to the client
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let id = uuidv4();
    let newNote = {
        title: req.body.title,
        text: req.body.text,
        id: id
    };
    console.log("newNote", newNote);
    savedNotes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes), (err) => {
        if (err) throw err;
        console.log("error");
    });
        console.log("New Note Saved!");
        return res.json(savedNotes);
});

// delete a note with a given id
app.delete('/api/notes/:id', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = req.params.id;
    let newId = 0;
    console.log(`Deleting note with id ${noteId}`);
    savedNotes = savedNotes.filter(currentNote => {
        return currentNote.id != noteId;
    })
    for (currentNote of savedNotes) {
        currentNote.id = newId.toString();
        newId++;
    }
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(savedNotes);
});

// Create a GET * route that returns index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Start the server on the port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});


