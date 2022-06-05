const { response } = require('express');
const express = require('express');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

// Get routes for index.html and note.html files
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// GET route to read db.json file
app.get('/api/notes', (req, res) => {
    fs.readFile('/db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parseData = JSON.parse(data);
        res.json(parseData);
    });
});
// POST route to post a new note
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uniqid(),
        };
        fs.readFile('/db/db.json', 'utf-8', (err, data) => {
            if (err) throw err;
            const parseData = JSON.parse(data);
            parseData.push(newNote);
            fs.writeFile('/db/db.json', JSON.stringify(parseData), (err) => {
                if (err) throw err;
                res.json(parseData);
                console.log('The note has been saved!');
            });
        });
    }  
});


// DELETE ROUTE put some this logic in separate function
app.delete('/api/notes/:id', (req, res) => {
   const allNotes = JSON.parse(fs.readFileSync('/db/db.json'))
   const deleteNote = allNotes.filter(note => {(note.id === req.params.id);
  
   fs.writeFileSync('db/db.json', JSON.stringify(deleteNote), (err) => {
       if (err) throw err;
       res.json(deleteNote);
   });
});
});


app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));
