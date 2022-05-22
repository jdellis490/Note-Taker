const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes

// Get route for all the notes
// GET route to read api notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parseData = JSON.parse(data);
        res.json(parseData);
    });
});
// POST route to post a new note
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parseData = JSON.parse(data);
        const newNote = req.body;
        parseData.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(parseData), (err) => {
            if (err) throw err;
            res.json(parseData);
            console.log('The note has been saved!');
        });
        //res.json(parseData);
    });
});

// DELETE ROUTE put some this logic in separate function
//getData - might need to be a promise - fs promises




app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));
