function loadNavbar() {
    fetch('/Pages/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching navbar:', error);
        document.getElementById('navbar-placeholder').innerHTML = '<p>Error loading navbar</p>';
    });
}

loadNavbar();