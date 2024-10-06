import { faker } from 'https://cdn.jsdelivr.net/npm/@faker-js/faker@9.0.3/dist/index.min.js';

        function add() {
            console.log('add function called');
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

           superagent.post('http://localhost:3000/new_user')
        .send({
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
            if(res.statusCode == 200){
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