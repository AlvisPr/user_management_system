fetch('/navbar')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;
})
.catch(error => {
    console.error('Error fetching navbar:', error);
    document.getElementById('navbar-placeholder').innerHTML = '<p>Error loading navbar</p>';
});

fetch('/fetch-addData')
.then(response => response.text())
.then(code => {
    const blob = new Blob([code], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    import(url).then(module => {
        window.add = module.add;
    }).catch(error => {
        console.error('Error importing module:', error);
    });
})
.catch(error => {
    console.error('Error fetching script:', error);
});