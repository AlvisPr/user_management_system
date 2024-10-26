console.log("showUswers loaded");   


// Load navbar content
fetch('/navbar')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;
})
.catch(error => {
    console.error('Error fetching navbar:', error);
    document.getElementById('navbar-placeholder').innerHTML = '<p>Error loading navbar</p>';
});

// Load and display user accounts
fetch('/accounts')
.then(response => response.json())
.then(users => {
    const userCards = document.getElementById('user-cards');
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4" id="user-card-${user.id}">
                <div class="card-body">
                    <h5 class="card-title">${user.name}</h5>
                    <img src="${user.avatar}" class="card-img-top" alt="User avatar">
                    <p class="card-text"> <b>Email:</b> ${user.email}</p>
                    <button class="btn btn-primary" onclick="deleteUser(${user.id})">Delete</button>
                </div>
            </div>
        `;
        userCards.appendChild(card);
    });
})
.catch(error => {
    console.error('Error fetching users:', error);
});


window.deleteUser = function(userId) {
    fetch(`/accounts/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const userCard = document.getElementById(`user-card-${userId}`);
        if (userCard) {
            userCard.remove();
        }
        if (!data.success) {
            console.error('Error deleting user:', data.message);
        }
    })
    .catch(error => {
        console.error('Error deleting user:', error);
        const userCard = document.getElementById(`user-card-${userId}`);
        if (userCard) {
            userCard.remove();
        }
    });
};