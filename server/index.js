import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = process.env.PORT || 3001;

// Improved absolute path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Database setup with absolute path
const dbPath = path.join(__dirname, 'database', 'db.json');
const adapter = new FileSync(dbPath);
const db = low(adapter);

db.defaults({ accounts: [] }).write();

app.use(bodyParser.json());

// Single static file middleware with absolute path
app.use(express.static(path.join(rootDir, 'public')));

// Function to convert UUID to a number
function uuidToNumber(uuid) {
    let hash = 0;
    for (let i = 0; i < uuid.length; i++) {
        const char = uuid.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; 
    }
    return Math.abs(hash);
}

// Updated route handlers with absolute paths
app.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'public/Pages/addUser.html'));
});

app.get('/navbar', (req, res) => {
    res.sendFile(path.join(rootDir, 'public/Pages/navbar.html'));
});

app.get('/adduser', (req, res) => {
    res.sendFile(path.join(rootDir, 'public/Pages/addUser.html'));
});

app.get('/show_users', (req, res) => {
    res.sendFile(path.join(rootDir, 'public/Pages/showUsers.html'));
});

// JS files route with absolute path
app.get('/js/:filename', (req, res) => {
    const options = {
        root: path.join(__dirname, 'JS'),
        dotfiles: 'deny',
    };
    res.sendFile(req.params.filename, options);
});

// API routes
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

// New endpoint to create a fake user
app.post('/create-fake-user', (req, res) => {
    const uuid = uuidv4();
    const id = uuidToNumber(uuid);
    const fakeName = faker.person.fullName();
    const fakeEmail = faker.internet.email();
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const phone = faker.phone.number();
    const streetAddress = faker.location.streetAddress();
    const cityStateZip = `${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`;
    const latitude = faker.location.latitude();
    const longitude = faker.location.longitude();
    const avatar = faker.image.avatar();
    const jobTitle = faker.person.jobTitle();
    const companyName = faker.company.name();
    const dob = faker.date.past({ years: 50, refDate: new Date(2020, 0, 1) });

    const newUser = {
        id: id,
        name: fakeName,
        email: fakeEmail,
        username: username,
        password: password,
        phone: phone,
        streetAddress: streetAddress,
        cityStateZip: cityStateZip,
        latitude: latitude,
        longitude: longitude,
        avatar: avatar,
        jobTitle: jobTitle,
        companyName: companyName,
        dob: dob
    };

    db.get('accounts').push(newUser).write();
    res.status(200).send({ success: true, user: newUser });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});