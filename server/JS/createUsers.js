import { faker } from 'https://cdn.jsdelivr.net/npm/@faker-js/faker@9.0.3/dist/index.min.js';
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@10.0.0/dist/esm-browser/index.js'; 

function uuidToNumber(uuid) {
    let hash = 0;
    for (let i = 0; i < uuid.length; i++) {
        const char = uuid.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; 
    }
    return Math.abs(hash);
}


fetch('/navbar')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;
})
.catch(error => {
    console.error('Error fetching navbar:', error);
    document.getElementById('navbar-placeholder').innerHTML = '<p>Error loading navbar</p>';
});


export function add() {
    console.log('add function called');
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

    superagent.post('/accounts')
        .send({
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
        })
        .end((err, res) => {
            if (err) {
                console.error(err);
                document.getElementById('status').innerHTML = `User not added!`;
                return;
            }
            if (res.statusCode === 200) {
                document.getElementById('status').innerHTML = `<b>Response: Status Code 200. </b> <br>
                    The HTTP 200 OK success status response code indicates that the request has succeeded. <br>
                    User: ${fakeName} <br>
                    ${new Date().toLocaleString()}`;
            } else {
                document.getElementById('status').innerHTML = `User not added!`;
            }
        });
}

window.add = add;