const express = require('express');
const path = require('path');
const app = express();

const cors = require('cors');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(path.join(__dirname, '..', 'database', 'db.json'));
const db = low(adapter);

app.use(express.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '..', 'public')));

db.defaults({ users: [] }).write();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'Pages', 'addUser.html'));
});

app.get('/navbar', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'Pages', 'navbar.html'));
});

app.get('/addUser', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'Pages', 'addUser.html'));
});

app.get('/show_users', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'Pages', 'showUsers.html'));
});

app.post('/new_user', (req, res) => {
    const data = db.get('users').push(req.body).write();
    res.status(200).send(data);
});

app.get('/users', (req, res) => {
    const data = db.get('users').value();
    res.status(200).send(data);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});