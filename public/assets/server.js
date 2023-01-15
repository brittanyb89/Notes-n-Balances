const express = require('express');
// import cors from "cors";
// import noteData from "../db/db.json" assert { type: "json" };

// Start express
const app = express();

// Set up port
const PORT = process.env.PORT || 3001;

// Use UUID to generate unique IDs for each note
const { v4: uuidv4 } = require('uuid');

// HTML routes
// TODO: Create a GET /notes route that returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(join(__dirname, '../notes.html'));
});

// TODO: Create a GET * route that returns index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Use the db.json on back-end to store and retrieve notes using the fs module
// Promise version of fs.readFile
// const readFromFile = promisify(fs.readFile);

// const writeToFile = (destination, content) => {
//     fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
//         err ? console.error(err) : console.info(`\nData written to ${destination}`);
//     });
// };

// const readAndAppend = (content, file) => {
//     fs.readFile(file, 'UTF8', (err, data) => {
//         if (err) {
//             console.error(err);
//             } else {
//                 const parsedData = JSON.parse(data);
//                 parsedData.push(content);
//                 writeToFile(file, parsedData);
//                 }
//             });
//         };

// module.exports = { readFromFile, writeToFile, readAndAppend };


            


// API routes
// TODO: Create a GET /api/notes route that reads the db.json file and returns all saved notes as JSON
// app.get('/api/notes', (req, res) => {
//     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
// });

// TODO: Create a POST /api/notes route that receives a new note to save on the request body, adds it to the db.json file, and then returns the new note to the client
// TODO: Give each note a unique id when it's saved (using uuid)

// TODO: BONUS: Create a DELETE /api/notes/:id route that receives a query parameter containing the id of a note to delete.
// TODO: In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
// express()
//     .use(express.static('public'))
//     .set('views', 'views')
//     .set('view engine', 'ejs')
//     .get('/', (req, res) => res.render('pages/index'))
//     .get('/send', (req, res) => res.render('pages/send'))
//     .listen(PORT, () => console.log(`Listening on ${ PORT }`))
// Invoke middleware, app.use() to serve static files from the public folder
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {res.send('Hello World!')});

// res.json() allows to return JSON instead of a buffer, string, or static file
// app.get('/api', (req, res) => res.json(noteData));

// app.get('/send', (req, res) => res.sendFile(path.join(__dirname, 'public/send.html')));

// Added a HTML route that will serve up the paths.html file
// app.get('/paths', (req, res) => res.sendFile(path.join(__dirname, 'public/paths.html')));

// app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});