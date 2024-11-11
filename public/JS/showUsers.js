


// Load and display user accounts
fetch('/accounts')
.then(response => response.json())
.then(users => {
    const userCards = document.getElementById('user-cards');
    userCards.className = 'row g-4 mb-5'; 
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'col-sm-6 col-md-4 col-lg-3 mb-4'; // Added mb-4 for vertical spacing
        card.innerHTML = `
            <div class="card h-100 shadow-sm" id="user-card-${user.id}" style="border: none; background: linear-gradient(145deg, #2d6899, rgb(45, 104, 153)); border-radius: 12px;">
                <div class="card-body text-center p-4 d-flex flex-column">
                    <div class="mb-4">
                        <img src="${user.avatar}" class="card-img-top shadow" alt="${user.name}'s avatar" 
                            style="border-radius: 50%; width: 120px; height: 120px; object-fit: cover; border: 4px solid rgba(255, 255, 255, 0.2);">
                    </div>
                    <h5 class="card-title fw-bold mb-3" style="color: #ffffff; font-size: 1.25rem;">${user.name}</h5>
                    <p class="card-text mb-4 text-truncate" style="color: rgba(255, 255, 255, 0.9);"> 
                        <i class="bi bi-envelope-fill me-2"></i>${user.email}
                    </p>
                    <button class="btn btn-light w-100 fw-bold mt-auto" onclick="deleteUser(${user.id})"
                        style="transition: all 0.3s ease; position: relative; overflow: hidden;"
                        onmouseover="this.style.backgroundColor='#dc3545'; this.style.color='white'; this.style.borderColor='#dc3545'"
                        onmouseout="this.style.backgroundColor=''; this.style.color=''; this.style.borderColor=''">
                        <i class="bi bi-trash me-2"></i>Delete User
                    </button>
                </div>
            </div>
        `;
        userCards.appendChild(card);
    });
}).catch(error => {
    console.error('Error fetching users:', error);
});

window.deleteUser = function(userId) {
    fetch(`/accounts/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            const userCard = document.getElementById(`user-card-${userId}`).parentElement;
            if (userCard) {
                userCard.style.transition = 'all 0.3s ease';
                userCard.style.transform = 'scale(0)';
                userCard.style.opacity = '0';
                
                setTimeout(() => {
                    userCard.remove();
                }, 300);
                
                alert('User deleted successfully');
            } else {
                alert('User not found');
            }
        }
    })
    .catch(error => {
        console.error('Error deleting user:', error);
    });
};            
