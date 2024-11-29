let map; // Declare map globally

// Clear the value of all input fields on the page
document.querySelectorAll('input').forEach(input => {
    input.value = '';
});

// <!-- When sending data (on the first page) -->
// <button onclick="navigateTo('next_page.html', { name: 'Justin', score: 95 })">Go to Next     Page</button>

// Function to navigate to a different page with optional URL parameters
function navigateTo(page, params = {}) {
    // Convert the params object to URL parameters
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    
    // Add the parameters to the URL if they exist
    const url = queryString ? `${page}?${queryString}` : page;
    window.location.href = url;
}

// Function to fetch test data from the server and update the table
async function fetchTestData() {
    try {
        console.log('Attempting to fetch data...');
        const response = await fetch('http://localhost:5000/test/data');
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        //console.log('Received data:', data);
        
        const tableBody = document.getElementById('resultsTableBody');
        tableBody.innerHTML = ''; // Clear existing data
        
        // Add rows for each year
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.year}</td>
                <td>$${Number(item.avg_lessthan50k).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                <td>$${Number(item.avg_fiftyTo75k).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                <td>$${Number(item.avg_seventy5To100k).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                <td>$${Number(item.avg_over100k).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Detailed Error:', error);
        const tableBody = document.getElementById('resultsTableBody');
        tableBody.innerHTML = `<tr><td colspan="5">Error loading data: ${error.message}</td></tr>`;
    }
}

// Function to fetch unique car makes from the server and populate the datalist
async function populateCarMakes() {
    try {
        //console.log('Fetching car makes...');
        const response = await fetch('http://localhost:5000/api/unique_car_makes');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        //console.log('Received car makes:', data);  // Debug log
        
        const datalist = document.getElementById('carMakeList');
        datalist.innerHTML = ''; // Clear existing options
        
        // Check the structure of your data and handle accordingly
        if (Array.isArray(data)) {
            data.forEach(item => {
                //console.log('Processing item:', item);  // Debug log
                const option = document.createElement('option');
                // Adjust this line based on your actual data structure
                option.value = item.make_name || item.make || '';
                datalist.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading car makes:', error);
    }
}

// Function to fetch unique car years from the server and populate the datalist
async function populateCarYearsMin() {
    try {
        //console.log('Fetching car makes...');
        const response = await fetch('http://localhost:5000/api/unique_car_years');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        //console.log('Received car makes:', data);  // Debug log
        
        const datalist = document.getElementById('minCarYears');
        datalist.innerHTML = ''; // Clear existing options
        
        // Check the structure of your data and handle accordingly
        if (Array.isArray(data)) {
            data.forEach(item => {
                //console.log('Processing item:', item);  // Debug log
                const option = document.createElement('option');
                // Adjust this line based on your actual data structure
                option.value = item.year_name || item.year_name || '';
                datalist.appendChild(option);
            });
        }


        
    } catch (error) {
        console.error('Error loading car makes:', error);
    }
}


async function populateCarYearsMax() {
    try {
        //console.log('Fetching car makes...');
        const response = await fetch('http://localhost:5000/api/unique_car_years');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        //console.log('Received car makes:', data);  // Debug log
        
        const datalist = document.getElementById('maxCarYears');
        datalist.innerHTML = ''; // Clear existing options
        
        // Check the structure of your data and handle accordingly
        if (Array.isArray(data)) {
            data.forEach(item => {
                //console.log('Processing item:', item);  // Debug log
                const option = document.createElement('option');
                // Adjust this line based on your actual data structure
                option.value = item.year_name || item.year_name || '';
                datalist.appendChild(option);
            });
        }


        
    } catch (error) {
        console.error('Error loading car makes:', error);
    }
}

// Function to fetch unique car models from the server and populate the datalist
async function populateCarModels() {
    try {
        //console.log('Fetching car models...');
        const response = await fetch('http://localhost:5000/api/unique_car_models');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        //console.log('Received car models:', data);  // Debug log
        
        const datalist = document.getElementById('carModels');
        datalist.innerHTML = ''; // Clear existing options
        
        // Check the structure of your data and handle accordingly
        if (Array.isArray(data)) {
            data.forEach(item => {
                //console.log('Processing item:', item);  // Debug log
                const option = document.createElement('option');
                // Adjust this line based on your actual data structure
                option.value = item.model || item.model || '';
                datalist.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading car makes:', error);
    }
}

// Function to fetch unique cities from the server and populate the datalist
async function populateCarCities() {
    try {
        //console.log('Fetching car models...');
        const response = await fetch('http://localhost:5000/api/unique_cities');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        //console.log('Received car locations:', data);  // Debug log
        
        const datalist = document.getElementById('cities');
        datalist.innerHTML = ''; // Clear existing options
        
        // Check the structure of your data and handle accordingly
        if (Array.isArray(data)) {
            data.forEach(item => {
                //console.log('Processing item:', item);  // Debug log
                const option = document.createElement('option');
                // Adjust this line based on your actual data structure
                option.value = item.location || item.location || '';
                datalist.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading car makes:', error);
    }
}

// Function to fetch unique states from the server and populate the datalist
async function populateCarStates() {
    try {
        //console.log('Fetching car states...');
        const response = await fetch('http://localhost:5000/api/unique_states');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        //console.log('Received car states:', data);  // Debug log
        
        const datalist = document.getElementById('states');
        datalist.innerHTML = ''; // Clear existing options
        
        // Check the structure of your data and handle accordingly
        if (Array.isArray(data)) {
            data.forEach(item => {
                //console.log('Processing item:', item);  // Debug log
                const option = document.createElement('option');
                // Adjust this line based on your actual data structure
                option.value = item.state || item.state || '';
                datalist.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading car makes:', error);
    }
}

// Function to fetch unique car titles from the server and populate the datalist
async function populateCarTitles() {
    try {
        //console.log('Fetching car titles...');
        const response = await fetch('http://localhost:5000/api/unique_titles');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        //console.log('Received car titles:', data);  // Debug log
        
        const datalist = document.getElementById('carTitles');
        datalist.innerHTML = ''; // Clear existing options
        
        // Check the structure of your data and handle accordingly
        if (Array.isArray(data)) {
            data.forEach(item => {
                //console.log('Processing item:', item);  // Debug log
                const option = document.createElement('option');
                // Adjust this line based on your actual data structure
                option.value = item.title || item.title || '';
                datalist.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading car makes:', error);
    }
}

// Function to initialize the map with default coordinates
function initializeMap() {
    // Initialize the map
    map = L.map('map').setView([46.8721, -113.9940], 7); // Default to Missoula coordinates

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        
    }).addTo(map);
}

// Function to load initial markers on the map
async function loadInitialMarkers() {
    try {
        const response = await fetch('http://localhost:5000/api/populate_choropleth_on_load');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        data.forEach(item => {
            var markerOptions = {};
            const priceIndex = (item.price - 2000) / (60000 - 2000);
            const odometerIndex = (item.odometer - 2000) / (120000 - 2000);
            const score = (priceIndex + odometerIndex) / 2;

            // Low Scores suggest better value (cheaper price for lower odometer readings).
            // High Scores suggest worse value (higher price for higher odometer readings).
            if (score < .25) {
                markerOptions = { 
                    icon: L.icon({ 
                        iconUrl: 'assets/pngtree-money-clipart-coin-cartoon-banknote-clipart-elements-png-image_2410174.jpg', 
                        iconSize: [25, 41], 
                        iconAnchor: [12, 41] 
                    }) 
                };
            }
            
            const marker = L.marker([item.latitude, item.longitude], markerOptions).addTo(map);
            // Format price and odometer with commas
            var formattedPrice = Math.floor(item.price || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            var formattedOdometer = (item.odometer || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            // Safely capitalize fields with null checks
            const capitalizedMake = item.make ? item.make.charAt(0).toUpperCase() + item.make.slice(1) : 'N/A';
            const capitalizedModel = item.model ? item.model.charAt(0).toUpperCase() + item.model.slice(1) : 'N/A';
            const capitalizedTitle = item.title ? item.title.charAt(0).toUpperCase() + item.title.slice(1) : 'N/A';
            
            // Convert date to m/d/y format
            const date = new Date(item.time_posted || Date.now());
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            
            const popupContent = `
                <b>Title:</b> ${capitalizedTitle}<br>
                <b>Price:</b> $${formattedPrice}<br>
                <b>Odometer:</b> ${formattedOdometer} miles<br>
                <b>Make:</b> ${capitalizedMake}<br>
                <b>Model:</b> ${capitalizedModel}<br>
                <b>Year:</b> ${item.year || 'N/A'}<br>
                <b>Date:</b> ${formattedDate}<br>
                <a href="${item.url}" target="_blank">View Listing</a><br>
                <a href="chassis_cache_car_stats.html?url=${encodeURIComponent(item.url)}">View Car Stats</a>
            `;
            marker.bindPopup(popupContent);
        });
    } catch (error) {
        console.error('Error fetching choropleth data:', error);
    }
}

// Function to get URL parameters and return them as an object
function getUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const data = {};
    for (const [key, value] of params) {
        data[key] = decodeURIComponent(value);
    }
    return data;
}





// Event listener for DOMContentLoaded to initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    
    // Get URL parameters if any
    const params = getUrlParameters();
    console.log('URL Parameters:', params.project_name);
    
    if (params.make) {
        document.getElementById('carMake').value = params.make;
    }
    if (params.model) {
        document.getElementById('carModel').value = params.model;
    }

    if (params.project_name) {
        document.getElementById('project_name').textContent = params.project_name;
    }

    // Initialize all data
    populateCarMakes();
    populateCarModels();
    populateCarCities();
    populateCarStates();
    populateCarTitles();
    populateCarYearsMin();
    populateCarYearsMax();

    // Initialize map and markers
    initializeMap();
    loadInitialMarkers();

    // Set up event listeners
    const submitButton = document.querySelector('.submit-btn');
    submitButton.addEventListener('click', submitFormData);
    
    // Add clear inputs functionality
    const clearButton = document.querySelector('.submit-btn[style*="background-color: grey;"]');
    if (clearButton) {
        clearButton.addEventListener('click', clearInputs);
    }
    
    // Add float validation listeners
    const travelDistanceInput = document.getElementById('travelDistance');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    travelDistanceInput.addEventListener('keypress', (e) => validateFloatInput(e, travelDistanceInput));
    minPriceInput.addEventListener('keypress', (e) => validateFloatInput(e, minPriceInput));
    maxPriceInput.addEventListener('keypress', (e) => validateFloatInput(e, maxPriceInput));
});

// Function to clear all input fields
function clearInputs() {
    document.getElementById('carMake').value = '';
    document.getElementById('carModel').value = '';
    document.getElementById('minCarYear').value = '';
    document.getElementById('maxCarYear').value = '';
    document.getElementById('city').value = '';
    document.getElementById('state').value = '';
    document.getElementById('carTitle').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('minOdometer').value = '';
    document.getElementById('maxOdometer').value = '';
}

// Function to collect form data and send to API
async function submitFormData() {
    try {
        // Log the form data being sent
        const formData = {
            make: document.getElementById('carMake').value || '',
            model: document.getElementById('carModel').value || '',
            min_year: document.getElementById('minCarYear').value || '',
            max_year: document.getElementById('maxCarYear').value || '',
            city: document.getElementById('city').value || '',
            state: document.getElementById('state').value || '',
            carTitle: document.getElementById('carTitle').value || '',
            min_price: document.getElementById('minPrice').value || '',
            max_price: document.getElementById('maxPrice').value || '',
            start_date: document.getElementById('startDate').value || '',
            end_date: document.getElementById('endDate').value || '',
            min_odometer: document.getElementById('minOdometer').value || '',
            max_odometer: document.getElementById('maxOdometer').value || ''
        };
        console.log('Sending min price form data:', formData.min_price);
        console.log('Sending max price form data:', formData.max_price);

        // Make API calls in parallel using Promise.all
        const [receiveResponse, searchResponse, searchResponseMap] = await Promise.all([
            // First API call - This retrieves the data from the user
            fetch('http://localhost:5000/api/receive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }),
            // Second API call - This is for the table query
            fetch('http://localhost:5000/api/car_search_by_mileage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            }),
            // Third API call - This is for the choropleth query
            fetch('http://localhost:5000/api/car_search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
        ]);

        const [receiveResult, searchData, searchDataMap] = await Promise.all([
            receiveResponse.json(),
            searchResponse.json(),
            searchResponseMap.json()
        ]);

        // Always update the table and map, even if no results found
        if (searchDataMap.data) {
            setSearchResults(searchDataMap.data);
        }
        
        // Always update the table, even if mileage_analysis is empty
        updateTableFromMileageSearch(searchData);

    } catch (error) {
        console.error('Error:', error);
        // Update table to show error state
        const tableBody = document.getElementById('resultsTableBody');
        tableBody.innerHTML = '<tr><td colspan="5">Error loading data. Please try again.</td></tr>';
    }
}

// Function to validate float input
function validateFloatInput(event, element) {
    // Allow only numbers, decimal point, and backspace/delete
    if (!/[\d.]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
        event.preventDefault();
        return;
    }

    // Prevent multiple decimal points
    if (event.key === '.' && element.value.includes('.')) {
        event.preventDefault();
        return;
    }

    // Prevent non-numeric characters after decimal point
    const parts = element.value.split('.');
    if (parts[1] && parts[1].length >= 2 && event.key !== 'Backspace' && event.key !== 'Delete') {
        event.preventDefault();
        return;
    }
}

// Add event listeners for float validation
document.addEventListener('DOMContentLoaded', function() {
    const travelDistanceInput = document.getElementById('travelDistance');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    // Add keypress validation for travel distance
    travelDistanceInput.addEventListener('keypress', (e) => validateFloatInput(e, travelDistanceInput));

    // Add keypress validation for price inputs
    minPriceInput.addEventListener('keypress', (e) => validateFloatInput(e, minPriceInput));
    maxPriceInput.addEventListener('keypress', (e) => validateFloatInput(e, maxPriceInput));
});

// Add click event listener to submit button
document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.submit-btn');
    // This is the event when the submit button is pressed. it calls the submitFormData
    submitButton.addEventListener('click', submitFormData);
    
});

// Function to handle setting search results on the map
function setSearchResults(searchData) {
    // Clear existing markers from the map
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add new markers for search results
    searchData.forEach(item => {
        var markerOptions = {};
        const priceIndex = (item.price - 2000) / (60000 - 2000);
        const odometerIndex = (item.odometer - 2000) / (120000 - 2000);
        const score = (priceIndex + odometerIndex) / 2;

        // Low Scores suggest better value (cheaper price for lower odometer readings).
        // High Scores suggest worse value (higher price for higher odometer readings).
        if (score < .25) {
            markerOptions = { 
                icon: L.icon({ 
                    iconUrl: 'assets/pngtree-money-clipart-coin-cartoon-banknote-clipart-elements-png-image_2410174.jpg', 
                    iconSize: [25, 41], 
                    iconAnchor: [12, 41] 
                }) 
            };
        }
        var marker = L.marker([item.latitude, item.longitude], markerOptions).addTo(map);
        var formattedPrice = Math.floor(item.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var formattedOdometer = item.odometer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var capitalizedMake = item.make.charAt(0).toUpperCase() + item.make.slice(1);
        var capitalizedModel = item.model.charAt(0).toUpperCase() + item.model.slice(1);
        var capitalizedTitle = item.title.charAt(0).toUpperCase() + item.title.slice(1);
        const date = new Date(item.time_posted);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        
        marker.on('click', function(e) {
            console.log('Marker clicked:', item);
        });
        
        const popupContent = `
            <b>Title:</b> ${capitalizedTitle}<br>
            <b>Price:</b> $${formattedPrice}<br>
            <b>Odometer:</b> ${formattedOdometer} miles<br>
            <b>Make:</b> ${capitalizedMake}<br>
            <b>Model:</b> ${capitalizedModel}<br>
            <b>Year:</b> ${item.year}<br>
            <b>Date:</b> ${formattedDate}<br>
            <a href="${item.url}" target="_blank">View Listing</a><br>
            <a href="chassis_cache_car_stats.html?url=${encodeURIComponent(item.url)}">View Car Stats</a>
        `;
        
        marker.bindPopup(popupContent);
        
        marker.on('popupopen', function(e) {
            console.log('Popup opened:', item);
        });
    });
}

// Function to update table from car_search_by_mileage API
function updateTableFromMileageSearch(searchData) {
    const tableBody = document.getElementById('resultsTableBody');
    tableBody.innerHTML = ''; // Clear existing table rows

    // We want to use the mileage_analysis data from the response
    if (searchData.mileage_analysis && searchData.mileage_analysis.length > 0) {
        searchData.mileage_analysis.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.year}</td>
                <td>$${Number(item.avg_lessthan50k || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                <td>$${Number(item.avg_fiftyTo75k || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                <td>$${Number(item.avg_seventy5To100k || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                <td>$${Number(item.avg_over100k || 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
            `;
            tableBody.appendChild(row);
        });

        // Update results count
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = `Found ${searchData.count} matching vehicles`;
        }
    } else {
        // No results found
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="5">No data available for the selected criteria</td>';
        tableBody.appendChild(row);
    }
}

// Function to sort the table by a specific column
function sortTable(columnIndex) {
    const table = document.getElementById('resultsTableBody');
    const rows = Array.from(table.getElementsByTagName('tr'));
    const th = document.querySelectorAll('#resultsTable th')[columnIndex];
    
    // Get or initialize the sort direction
    th.dataset.sortDir = th.dataset.sortDir === 'asc' ? 'desc' : 'asc';
    
    // Sort the rows
    rows.sort((a, b) => {
        const aCol = a.getElementsByTagName('td')[columnIndex].textContent;
        const bCol = b.getElementsByTagName('td')[columnIndex].textContent;
        
        // Parse numbers (removing '$' and ',' if present)
        const aValue = parseFloat(aCol.replace(/[$,]/g, '')) || aCol;
        const bValue = parseFloat(bCol.replace(/[$,]/g, '')) || bCol;
        
        if (th.dataset.sortDir === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
    
    // Update table with sorted rows
    rows.forEach(row => table.appendChild(row));
    
    // Update sort indicators on all headers
    document.querySelectorAll('#resultsTable th').forEach((header, index) => {
        header.classList.remove('asc', 'desc');
        if (index === columnIndex) {
            header.classList.add(th.dataset.sortDir);
        }
    });
}





// Event listener for DOMContentLoaded to handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.querySelector('.submit-btn');
    submitButton.addEventListener('click', async function() {
        // Collect form data
        const searchParams = {
            carMake: document.getElementById('carMake').value,
            carModel: document.getElementById('carModel').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            travelDistance: document.getElementById('travelDistance').value,
            carTitle: document.getElementById('carTitle').value,
            minPrice: document.getElementById('minPrice').value,
            maxPrice: document.getElementById('maxPrice').value,
            startDate: document.getElementById('startDate').value,
            endDate: document.getElementById('endDate').value,
            minOdometer: document.getElementById('minOdometer').value,
            maxOdometer: document.getElementById('maxOdometer').value
        };

        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/car_search_by_mileage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchParams)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            updateTableFromMileageSearch(data);
        } catch (error) {
            console.error('Error:', error);
            // Optionally add user-friendly error handling here
        }
    });
});

console.log('Min Price:', document.getElementById('minPrice').value);

