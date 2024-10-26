import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const adapter = new FileSync(path.join(__dirname, 'database', 'db.json'));
const db = low(adapter);

db.defaults({ accounts: [] }).write();

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/js/:filename', (req, res) => {
    const options = {
        root: path.join(__dirname, 'JS'),
        dotfiles: 'deny',
    };

    res.sendFile(req.params.filename, options, (err) => {
        if (err) {
            res.status(404).send({ message: 'File not found' });
        }
    });
});

const serveHtml = (route, filePath) => {
    app.get(route, (req, res) => {
        res.sendFile(path.join(__dirname, filePath));
    });
};

serveHtml('/', '../public/Pages/addUser.html');
serveHtml('/navbar', '../public/Pages/navbar.html');
serveHtml('/adduser', '../public/Pages/addUser.html');
serveHtml('/show_users', '../public/Pages/showUsers.html');
serveHtml('/fetch-addData', 'JS/addusers.js');

app.get('/accounts', (req, res) => {
    const data = db.get('accounts').value();
    res.status(200).send(data);
});

app.post('/accounts', (req, res) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).send({ message: 'Invalid account data' });
    }

    const data = db.get('accounts').push(req.body).write();
    console.log("Data posted!");
    res.status(200).send(data);
});

app.delete('/accounts/:id', (req, res) => {
    const userId = Number(req.params.id);
    const account = db.get('accounts').find({ id: userId }).value();

    if (!account) {
        return res.status(404).send({ message: 'Account not found' });
    }

    db.get('accounts').remove({ id: userId }).write();
    res.status(200).send({ message: 'Account deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
