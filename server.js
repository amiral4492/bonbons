const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const db = new sqlite3.Database('./database.db');

app.use(express.json());

// Créer un bâtiment
app.post('/buildings', (req, res) => {
    const { street_number, street_name, city } = req.body;
    db.run(`INSERT INTO Buildings (street_number, street_name, city) VALUES (?, ?, ?)`, [street_number, street_name, city], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
