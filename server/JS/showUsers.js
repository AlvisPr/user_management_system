

superagent.get('http://204.48.18.221:3001/accounts')
    .then(response => {
        const users = response.body;
        const container = document.querySelector('#user-cards'); // Make sure container is available here
        users.forEach(user => {
            console.log(user);
            const div = document.createElement('div');
            div.className = 'col-md-4 mb-4';
            div.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <img src="${user.avatar}" class="card-img-top" alt="...">
                        <h5 class="card-title">${user.name}</h5>
                        <p class="card-text">${user.email}</p>
                        <button class="delete-btn" data-id="${user.id}">Delete User</button>
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    })
    .catch(error => console.error('Error fetching users:', error));


fetch('/navbar')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar:', error));


    

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const userId = event.target.getAttribute('data-id');
        console.log('Delete user:', userId);
        superagent.delete(`http://204.48.18.221:3001/accounts/${userId}`)
            .then(() => {
                event.target.closest('.col-md-4').remove();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }
});
