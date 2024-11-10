
export function add() {
    console.log('add function called');
    
    document.getElementById('status').innerHTML = `
        <div class="d-flex align-items-center col-md-6">
            <div class="spinner-border text-primary me-2" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span>Creating user...</span>
        </div>
    `;

    fetch('/create-fake-user', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('status').innerHTML = `
                <div class="alert alert-success col-md-6" role="alert">
                    <h5 class="alert-heading"><i class="bi bi-check-circle-fill me-2"></i>Success!</h5>
                    <hr>
                    <p class="mb-0"><strong>Status Code 200</strong></p>
                    <p>User "${data.user.name}" has been successfully created.</p>
                    <small class="text-muted">${new Date().toLocaleString()}</small>
                </div>
            `;
        } else {
            document.getElementById('status').innerHTML = `
                <div class="alert alert-danger col-md-6" role="alert">
                    <h5 class="alert-heading"><i class="bi bi-x-circle-fill me-2"></i>Error</h5>
                    <p>Failed to create user. Please try again.</p>
                </div>
            `;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('status').innerHTML = `
            <div class="alert alert-danger col-md-6" role="alert">
                <h5 class="alert-heading"><i class="bi bi-exclamation-triangle-fill me-2"></i>Error</h5>
                <p>An unexpected error occurred. Please try again later.</p>
                <small class="text-muted">Error details: ${error.message}</small>
            </div>
        `;
    });
}

window.add = add;window.add = add;