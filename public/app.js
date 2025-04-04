document.getElementById('buildingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const streetNumber = document.getElementById('streetNumber').value;
    const streetName = document.getElementById('streetName').value;
    const city = document.getElementById('city').value;

    fetch('https://bonbons-amirals-projects.vercel.app/buildings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ street_number: streetNumber, street_name: streetName, city: city })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur réseau : ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert('Bâtiment créé avec succès ! ID: ' + data.id);
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur lors de la création du bâtiment : ' + error.message);
    });
});