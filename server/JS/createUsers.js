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

    fetch('/create-fake-user', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('status').innerHTML = `<b>Response: Status Code 200. </b> <br>
                The HTTP 200 OK success status response code indicates that the request has succeeded. <br>
                User: ${data.user.name} <br>
                ${new Date().toLocaleString()}`;
        } else {
            document.getElementById('status').innerHTML = `User not added!`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('status').innerHTML = `User not added!`;
    });
}

window.add = add;