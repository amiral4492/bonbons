const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const app = express();
const path = require('path'); // Ajoutez cette ligne

// Servir les fichiers statiques (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Activer CORS
app.use(cors());

// Initialiser Supabase
const supabaseUrl = 'https://bqywnyplxcyhcwefrsgl.supabase.co'; // Remplacez par votre URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxeXdueXBseGN5aGN3ZWZyc2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1MDE4OTksImV4cCI6MjA1ODA3Nzg5OX0.8yz3OzTH0uJV_7Sd--vHnLecFL42b9GNnrT4POkF90E'; // Remplacez par votre clé API
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Créer un bâtiment
app.post('/buildings', async (req, res) => {
    const { street_number, street_name, city } = req.body;
    const { data, error } = await supabase
        .from('Buildings')
        .insert([{ street_number, street_name, city }])
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    if (!data || data.length === 0) {
        return res.status(500).json({ error: 'Aucune donnée renvoyée par Supabase' });
    }
    res.json(data[0]);
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
