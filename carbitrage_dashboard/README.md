## Table of Contents
1. [Notes](#notes)
2. [carbitrage_api_processing.py](#carbitrage_api_processingpy)
3. [query_prep.ipynb](#query_prepipynb)
4. [current_project_script.js](#current_project_scriptjs)
5. [current_project.html](#current_projecthtml)
6. [server.js](#serverjs)
7. [Summary](#summary)

## Notes 

Last carbitrage db update was 11/18/2024, need to automate that


It would be cool to do this on the car-specific page:
https://observablehq.com/@d3/connected-scatterplot/2


## Recommended Workflow for Modifying Project Files

When you need to make changes to the Carbitrage Dashboard project, follow this order to ensure a smooth and efficient workflow:

1. **Understand the Requirement**:
   - Clearly define what needs to be changed or added.

2. **Update Database Queries**:
   - If the change involves data retrieval or storage, modify `query_prep.ipynb` to update SQL queries or database schema.
   - Ensure that the database structure supports the new requirements.

3. **Modify Backend Logic**:
   - Start with `carbitrage_api_processing.py` if the change involves backend logic or API endpoints.
   - Update or add new functions and endpoints as needed.

4. **Adjust Frontend Scripts**:
   - Move to `current_project_script.js` to update JavaScript functions that interact with the backend.
   - Ensure that the frontend correctly handles new or modified data.

5. **Update HTML Structure**:
   - Modify `current_project.html` to reflect any changes in the UI layout or elements.
   - Ensure that the HTML structure supports the updated JavaScript logic.

6. **Server Configuration**:
   - If server-side changes are needed, update `server.js` to configure server settings or middleware.

7. **Testing**:
   - Test the changes locally to ensure everything works as expected.
   - Write or update tests to cover new functionality.

8. **Documentation**:
   - Update the README and any other relevant documentation to reflect the changes made.




## carbitrage_api_processing.py

This file contains the Flask API for the Carbitrage Dashboard. It provides various API endpoints for the Carbitrage web application, handling data exchange between frontend and backend services. The main functionalities include:

- **Initialization**: The Flask application is initialized and CORS is enabled for all routes to allow cross-origin requests.
- **Database Querying**: The `query_database` function is used to query the carbitrage database and return the results.
- **API Endpoints**:
  - `/test/data`: Returns sample data for verifying API connectivity.
  - `/api/unique_car_makes`: Returns unique car make names for populating car make dropdowns in the frontend.
  - `/api/unique_car_models`: Returns unique car model names for populating car model dropdowns in the frontend.
  - `/api/unique_cities`: Returns unique locations for populating location dropdowns in the frontend.
  - `/api/unique_states`: Returns unique states for populating state dropdowns in the frontend.
  - `/api/unique_titles`: Returns unique car titles for populating car title dropdowns in the frontend.
  - `/api/populate_choropleth_on_load`: Returns data for populating choropleth maps in the frontend.
  - `/api/receive`: Receives data from the frontend and returns a confirmation response.
  - `/api/car_search`: Searches for cars based on user input criteria and returns the results.

## query_prep.ipynb

This Jupyter Notebook is used for preparing and processing queries related to the Carbitrage Dashboard. It includes the following key sections:

- **Table Creation**:
  - `unique_car_make_names_table`: A table for unique car make names.
  - `unique_car_model_names_table`: A table for unique car model names.
  - `year_avgprice_table`: A table for average car prices by year for different mileage ranges.

- **View Creation**:
  - `year_avgprice_view`: A view for average car prices by year for different mileage ranges.

- **Data Processing**:
  - The notebook processes and prints JSON data related to car prices and other attributes.

The notebook contains various code cells for executing SQL queries, creating tables and views, and processing data for the Carbitrage Dashboard.

## current_project_script.js

This JavaScript file is used for handling various frontend functionalities of the Carbitrage Dashboard. It includes functions for populating dropdowns, fetching data, validating inputs, and handling map interactions. The main functionalities include:

- **Data Population**:
  - `populateCarMakes()`: Fetches unique car makes from the API and populates the car make dropdown.
  - `populateCarModels()`: Fetches unique car models from the API and populates the car model dropdown.
  - `populateCarCities()`: Fetches unique car locations from the API and populates the city dropdown.
  - `populateCarStates()`: Fetches unique car states from the API and populates the state dropdown.
  - `populateCarTitles()`: Fetches unique car titles from the API and populates the car title dropdown.

- **Data Fetching**:
  - `fetchTestData()`: Fetches sample data from the API and populates the results table.

- **Form Handling**:
  - `submitFormData()`: Collects form data, sends it to the API, and handles the response. It also updates the map and results table based on the search results.

- **Input Validation**:
  - `validateFloatInput(event, element)`: Validates float inputs to ensure only valid characters are entered.

- **Map Initialization and Interaction**:
  - Initializes the map with default coordinates and adds OpenStreetMap tiles.
  - Fetches data from the API to populate the map with markers.
  - `setSearchResults(searchData)`: Sets search results on the map by adding markers for each result.

- **Event Listeners**:
  - Adds event listeners for form submission and input validation.
  - Adds event listeners for DOM content loaded to initialize the map and populate dropdowns.

The file ensures interaction between the frontend and backend, providing a dynamic and interactive user experience for the Carbitrage Dashboard.

## current_project.html

This HTML file serves as the main interface for the Carbitrage Dashboard. It includes the following key sections:

- **Header Section**:
  - Contains navigation buttons for different pages such as Home, About Me, Explore Projects, and Current Project.
  - Displays the page title and a button to download the resume.

- **Main Content**:
  - **Search Form Section**:
    - Provides input fields for car make, car model, city, state, travel distance, car title, price range, and date range.
    - Includes a search button to submit the form.
  - **Map Section**:
    - Integrates a map using Leaflet.js to display car locations.
    - Fetches data from the API to populate the map with markers.
  - **Results Table**:
    - Displays search results in a table format with columns for year and mileage ranges.

- **Footer Section**:
  - Contains contact information.

- **Styles and Scripts**:
  - Includes CSS styles for layout and design.
  - Includes JavaScript functions for navigation and interaction.

## server.js

This Node.js file sets up the backend server for the Carbitrage Dashboard using Express. It includes the following key functionalities:

- **Static File Serving**:
  - Serves static files from the 'public' directory.

- **API Endpoints**:
  - `/api/flask`: Fetches data from the Flask API.
  - `/api/flask/send`: Sends data to the Flask API.
  - `/api/test-data`: Fetches test data from the Flask API.
  - `/api/unique_car_makes`: Fetches unique car makes from the Flask API.
  - `/api/unique_car_models`: Fetches unique car models from the Flask API.
  - `/api/unique_cities`: Fetches unique car cities from the Flask API.
  - `/api/unique_states`: Fetches unique car states from the Flask API.
  - `/api/unique_titles`: Fetches unique car titles from the Flask API.
  - `/api/populate_choropleth_on_load`: Fetches data to populate the choropleth map on load.

- **Server Initialization**:
  - Starts the server and listens on port 3000.

## Summary

The Carbitrage Dashboard is a web application that provides an interactive interface for users to search for cars based on various criteria. The `current_project.html` file serves as the frontend, offering a search form, map, and results table. The `server.js` file acts as the backend, handling API requests and serving static files. Together, these components create a seamless user experience, allowing users to search for cars, view results on a map, and interact with the data dynamically. The integration with the Flask API ensures that the frontend and backend can communicate effectively, providing real-time data updates and interactions.
