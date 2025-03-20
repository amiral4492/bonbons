document.getElementById('buildingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const streetNumber = document.getElementById('streetNumber').value;
    const streetName = document.getElementById('streetName').value;
    const city = document.getElementById('city').value;

    fetch('/buildings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ street_number: streetNumber, street_name: streetName, city: city })
    })
    .then(response => response.json())
    .then(data => {
        alert('Bâtiment créé avec succès ! ID: ' + data.id);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
});
