import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Send 'index.html' when the homepage is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

// Function to switch tabs, currently unused
function openTab(evt, tabName) {
    var i, tabcontent, tabbuttons;

    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the active class from all tab buttons
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }

    // Show the current tab and mark the button as active
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Experimental code for interacting with a Flask API

// Endpoint to get data from Flask API
app.get('/api/flask', async (req, res) => {
    try {
        const response = await fetch('http://localhost:5000/api/data');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching from Flask API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Flask API' });
    }
});

// Endpoint to send data to Flask API
app.post('/api/flask/send', async (req, res) => {
    try {
        const response = await fetch('http://localhost:5000/api/receive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error sending to Flask API:', error);
        res.status(500).json({ error: 'Failed to send data to Flask API' });
    }
});

// Endpoint to fetch test data from Flask API
app.get('/api/test-data', async (req, res) => {
    try {
        console.log('Fetching test data from Flask API at: http://localhost:5000/test/data');
        
        const response = await fetch('http://localhost:5000/test/data');
        if (!response.ok) {
            throw new Error(`Flask API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data from Flask:', data);
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching from Flask API:', error);
        res.status(500).json({ 
            error: 'Failed to fetch test data from Flask API',
            details: error.message 
        });
    }
});

// Endpoint to fetch unique car makes from Flask API
app.get('/api/unique_car_makes', async (req, res) => {
    try {
        console.log('Fetching car makes from Flask API at: http://localhost:5000/api/unique_car_makes');
        
        const response = await fetch('http://localhost:5000/api/unique_car_makes');
        if (!response.ok) {
            throw new Error(`Flask API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data from Flask:', data);
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching from Flask API:', error);
        res.status(500).json({ 
            error: 'Failed to fetch car makes from Flask API',
            details: error.message 
        });
    }
});

// Endpoint to fetch unique car makes from Flask API
app.get('/api/unique_car_models', async (req, res) => {
    try {
        console.log('Fetching car makes from Flask API at: http://localhost:5000/api/unique_car_models');
        
        const response = await fetch('http://localhost:5000/api/unique_car_models');
        if (!response.ok) {
            throw new Error(`Flask API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data from Flask:', data);
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching from Flask API:', error);
        res.status(500).json({ 
            error: 'Failed to fetch car makes from Flask API',
            details: error.message 
        });
    }
});

// Endpoint to fetch unique car cities from Flask API
app.get('/api/unique_cities', async (req, res) => {
    try {
        console.log('Fetching car makes from Flask API at: http://localhost:5000/api/unique_cities');
        
        const response = await fetch('http://localhost:5000/api/unique_cities');
        if (!response.ok) {
            throw new Error(`Flask API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data from Flask:', data);
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching from Flask API:', error);
        res.status(500).json({ 
            error: 'Failed to fetch car makes from Flask API',
            details: error.message 
        });
    }
});

// Endpoint to fetch unique car cities from Flask API
app.get('/api/unique_states', async (req, res) => {
    try {
        console.log('Fetching car makes from Flask API at: http://localhost:5000/api/unique_states');
        
        const response = await fetch('http://localhost:5000/api/unique_states');
        if (!response.ok) {
            throw new Error(`Flask API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data from Flask:', data);
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching from Flask API:', error);
        res.status(500).json({ 
            error: 'Failed to fetch car makes from Flask API',
            details: error.message 
        });
    }
});

// Endpoint to fetch unique car cities from Flask API
app.get('/api/unique_titles', async (req, res) => {
    try {
        console.log('Fetching car makes from Flask API at: http://localhost:5000/api/unique_titles');
        
        const response = await fetch('http://localhost:5000/api/unique_titles');
        if (!response.ok) {
            throw new Error(`Flask API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data from Flask:', data);
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching from Flask API:', error);
        res.status(500).json({ 
            error: 'Failed to fetch car makes from Flask API',
            details: error.message 
        });
    }
});


// Endpoint to fetch unique car cities from Flask API
app.get('/api/populate_choropleth_on_load', async (req, res) => {
    try {
        console.log('Fetching car makes from Flask API at: http://localhost:5000/api/populate_choropleth_on_load');
        
        const response = await fetch('http://localhost:5000/api/populate_choropleth_on_load');
        if (!response.ok) {
            throw new Error(`Flask API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data from Flask:', data);
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching from Flask API:', error);
        res.status(500).json({ 
            error: 'Failed to fetch car makes from Flask API',
            details: error.message 
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
