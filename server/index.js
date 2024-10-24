import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


app.use(express.static(path.join(__dirname, '..', 'public')));

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

app.get('/fetch-addData', (req, res) => {
    res.sendFile(path.join(__dirname,  'JS', 'createUsers.js'));
});

app.get('/addusersjs', (req, res) => {
    res.sendFile(path.join(__dirname,  'JS', 'addUsers.js'));
})

app.get('/showusersjs', (req, res) => {
    res.sendFile(path.join(__dirname,  'JS', 'showUsers.js'));
})
app.listen(3000, () => {
    console.log('Server started on port 3000');
});