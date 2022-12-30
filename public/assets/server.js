// Import express
const express = require('express');
// Require the JSON file and assign it to a variable called 'noteData'
const noteData = require('./db/db.json');

// Initialize app variable by setting it to the value of express()
const app = express();
const PORT = 3002;

// Invoke middleware, app.use() to serve static files from the public folder
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send('Hello World!'));

// res.json() allows to return JSON instead of a buffer, string, or static file
app.get('/api', (req, res) => res.json(noteData));

// app.get('/send', (req, res) => res.sendFile(path.join(__dirname, 'public/send.html')));

// Added a HTML route that will serve up the paths.html file
// app.get('/paths', (req, res) => res.sendFile(path.join(__dirname, 'public/paths.html')));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));