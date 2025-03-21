const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors'); // Ajoutez cette ligne
const app = express();

// Activer CORS pour toutes les routes
app.use(cors());

// Initialiser Supabase
const supabaseUrl = 'https://votre-url.supabase.co'; // Remplacez par votre URL
const supabaseKey = 'votre-cle-api'; // Remplacez par votre clé API
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
    res.json(data[0]);
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
