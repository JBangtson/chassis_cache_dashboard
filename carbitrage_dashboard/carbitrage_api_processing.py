"""
Flask API for Carbitrage Dashboard
This module provides API endpoints for the Carbitrage web application.
Handles data exchange between frontend and backend services.
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from datetime import datetime

# Initialize Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes to allow cross-origin requests

def query_database(query, params=()):
    """
    Function to query the carbitrage database and return the results.
    
    Args:
        query (str): The SQL query to execute.
        params (tuple): Optional parameters for the query.
    
    Returns:
        list: A list of dictionaries containing the query results.
    """
    import sqlite3

    db_path = './data/carbitrage.db'
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()
    
    try:
        cursor.execute(query, params)
        columns = [description[0] for description in cursor.description]
        results = cursor.fetchall()
        data = [dict(zip(columns, row)) for row in results]
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        data = []
    finally:
        cursor.close()
        connection.close()
    
    return data

@app.route('/test/data', methods=['GET'])
def get_data():
    """
    Test endpoint that returns sample data.
    Used for verifying API connectivity.
    
    Returns:
        JSON: A dictionary containing car price averages for different mileage ranges
    """
    db_path = './data/carbitrage.db'
    on_load_table_query = """
        SELECT 
            year,
            printf('%.2f', avg_lessthan50k) as avg_lessthan50k,
            printf('%.2f', avg_fiftyTo75k) as avg_fiftyTo75k,
            printf('%.2f', avg_seventy5To100k) as avg_seventy5To100k,
            printf('%.2f', avg_over100k) as avg_over100k
        FROM year_avgprice_table;
    """
    try:
        # Add debug print statements
        print(f"Attempting to query database at: {db_path}")
        data = query_database(on_load_table_query)
        print(f"Query result: {data}")
        
        if not data:
            # Check if the view exists
            check_view_query = """
                SELECT name FROM sqlite_master 
                WHERE type='view' AND name='year_avgprice_view';
            """
            view_exists = query_database(check_view_query)
            if not view_exists:
                return jsonify({'error': 'View year_avgprice_view does not exist in the database'}), 500
            return jsonify({'error': 'No data found in year_avgprice_view'}), 404
            
    except Exception as e:
        return jsonify({'error': f"Database error: {str(e)}"}), 500
    
    return jsonify(data)


@app.route('/api/unique_car_makes', methods=['GET'])
def get_unique_car_makes():
    """
    Endpoint that returns unique car make names.
    Used for populating car make dropdowns in the frontend.
    """
    unique_car_makes_query = """
        SELECT DISTINCT make as make_name
        FROM unique_car_make_names_table
        ORDER BY make;
    """
    try:
        print("Attempting to fetch car makes...")
        data = query_database(unique_car_makes_query)
        print(f"Retrieved car makes data: {data}")  # Debug print
        
        if not data:
            return jsonify({'error': 'No car makes found'}), 404
            
        # Ensure data is in correct format
        formatted_data = [{'make_name': row['make_name']} for row in data]
        return jsonify(formatted_data)
        
    except Exception as e:
        print(f"Error in get_unique_car_makes: {str(e)}")  # Debug print
        return jsonify({'error': f"Database error: {str(e)}"}), 500


@app.route('/api/unique_car_models', methods=['GET'])
def get_unique_car_models():
    """
    Endpoint that returns unique car model names.
    Used for populating car model dropdowns in the frontend.
    
    Returns:
        JSON: A list of unique car model names
    """
    db_path = './data/carbitrage.db'
    unique_car_models_query = """
        SELECT *
        FROM unique_car_model_names_table
        ORDER BY model;
    """
    try:
        # Add debug print statements
        print(f"Attempting to query database at: {db_path}")
        data = query_database(unique_car_models_query)
        print(f"Query result: {data}")
        
        if not data:
            # Check if the table or view exists
            check_table_query = """
                SELECT name FROM sqlite_master 
                WHERE type IN ('table', 'view') AND name='unique_car_model_names';
            """
            table_exists = query_database(check_table_query)
            if not table_exists:
                return jsonify({'error': 'Table or view unique_car_model_names does not exist in the database'}), 500
            return jsonify({'error': 'No unique car models found'}), 404
            
    except Exception as e:
        return jsonify({'error': f"Database error: {str(e)}"}), 500
    
    return jsonify(data)

@app.route('/api/unique_cities', methods=['GET'])
def get_unique_locations():
    """
    Endpoint that returns unique locations.
    Used for populating location dropdowns in the frontend.
    
    Returns:
        JSON: A list of unique locations
    """
    db_path = './data/carbitrage.db'
    unique_locations_query = """
        SELECT *
        FROM unique_car_location_names_table;
    """
    try:
        # Add debug print statements
        print(f"Attempting to query database at: {db_path}")
        data = query_database(unique_locations_query)
        print(f"Query result: {data}")
        
        if not data:
            # Check if the table or view exists
            check_table_query = """
                SELECT name FROM sqlite_master 
                WHERE type IN ('table', 'view') AND name='unique_locations';
            """
            table_exists = query_database(check_table_query)
            if not table_exists:
                return jsonify({'error': 'Table or view unique_locations does not exist in the database'}), 500
            return jsonify({'error': 'No unique locations found'}), 404
            
    except Exception as e:
        return jsonify({'error': f"Database error: {str(e)}"}), 500
    
    return jsonify(data)

@app.route('/api/unique_states', methods=['GET'])
def get_unique_states():
    """
    Endpoint that returns unique states.
    Used for populating state dropdowns in the frontend.
    
    Returns:
        JSON: A list of unique states
    """
    db_path = './data/carbitrage.db'
    unique_states_query = """
        SELECT *
        FROM unique_state_table;
    """
    try:
        # Add debug print statements
        print(f"Attempting to query database at: {db_path}")
        data = query_database(unique_states_query)
        print(f"Query result: {data}")
        
        if not data:
            # Check if the table or view exists
            check_table_query = """
                SELECT name FROM sqlite_master 
                WHERE type IN ('table', 'view') AND name='unique_states';
            """
            table_exists = query_database(check_table_query)
            if not table_exists:
                return jsonify({'error': 'Table or view unique_states does not exist in the database'}), 500
            return jsonify({'error': 'No unique states found'}), 404
            
    except Exception as e:
        return jsonify({'error': f"Database error: {str(e)}"}), 500
    
    return jsonify(data)


@app.route('/api/unique_titles', methods=['GET'])
def get_unique_car_titles():
    """
    Endpoint that returns unique car titles.
    Used for populating car title dropdowns in the frontend.
    
    Returns:
        JSON: A list of unique car titles
    """
    db_path = './data/carbitrage.db'
    unique_car_titles_query = """
        SELECT *
        FROM unique_car_title_names_table;
    """
    try:
        # Add debug print statements
        print(f"Attempting to query database at: {db_path}")
        data = query_database(unique_car_titles_query)
        print(f"Query result: {data}")
        
        if not data:
            # Check if the table or view exists
            check_table_query = """
                SELECT name FROM sqlite_master 
                WHERE type IN ('table', 'view') AND name='unique_car_titles';
            """
            table_exists = query_database(check_table_query)
            if not table_exists:
                return jsonify({'error': 'Table or view unique_car_titles does not exist in the database'}), 500
            return jsonify({'error': 'No unique car titles found'}), 404
            
    except Exception as e:
        return jsonify({'error': f"Database error: {str(e)}"}), 500
    
    return jsonify(data)


@app.route('/api/populate_choropleth_on_load', methods=['GET'])
def get_choropleth_data():
    """
    Endpoint that returns longitude, latitude, URL, price, condition, and date.
    Used for populating choropleth maps in the frontend.
    
    Returns:
        JSON: A list of data for choropleth map
    """
    db_path = './data/carbitrage.db'
    choropleth_data_query = """
        SELECT 
            longitude, 
            latitude, 
            url, 
            printf('%.0f', price) as price,
            DATE(time_posted) as time_posted,
            odometer,
            make,
            model,
            title,
            year
        FROM carbitrage_table
        WHERE time_posted > '2024-11-01 00:00:00+00:00'
        AND LOWER(title) = 'clean'
        AND LOWER(state) = 'montana';
    """
    try:
        # Add debug print statements
        print(f"Attempting to query database at: {db_path}")
        data = query_database(choropleth_data_query)
        #print(f"Query result: {data}")
        print("Boom.")
        if not data:
            # Check if the table or view exists
            check_table_query = """
                SELECT name FROM sqlite_master 
                WHERE type IN ('table', 'view') AND name='choropleth_data_table';
            """
            table_exists = query_database(check_table_query)
            if not table_exists:
                return jsonify({'error': 'Table or view choropleth_data_table does not exist in the database'}), 500
            return jsonify({'error': 'No data found for choropleth map'}), 404
            
    except Exception as e:
        return jsonify({'error': f"Database error: {str(e)}"}), 500
    
    return jsonify(data)






@app.route('/api/receive', methods=['POST']) 
def receive_data():
    """
    Endpoint for receiving data from the frontend.
    Processes incoming JSON data and returns a confirmation response.
    
    Returns:
        JSON: A dictionary containing confirmation message and received data
    """
    user_input_data = request.get_json()
    # Process received data here
    response = {
        'message': 'User input data received successfully',
        'received_data': user_input_data
    }
    
    return jsonify(response)

@app.route('/api/car_search', methods=['POST'])
def search_cars():
    user_input = request.get_json()
    
    # Build query dynamically but safely
    query = "SELECT * FROM carbitrage_table WHERE 1=1"
    params = []
    
    # Only add conditions for non-empty values
    if user_input.get('make') and user_input['make'].strip() != "":
        query += " AND LOWER(make) LIKE LOWER(?)"
        params.append(f"%{user_input['make']}%")  # Using LIKE for partial matches
    
    if user_input.get('model') and user_input['model'].strip() != "":
        query += " AND LOWER(model) LIKE LOWER(?)"
        params.append(f"%{user_input['model']}%")
    
    # Debug print statements
    print(f"Min Price Input: {user_input.get('min_price')}")
    print(f"Max Price Input: {user_input.get('max_price')}")

    min_price = 0
    max_price = 2000000

    # Check user inputs
    if user_input.get('min_price') and user_input['min_price'].strip() != "<empty string>":
        min_price = float(user_input['min_price'])  # Ensure it's a valid float
    print(f"Updated min_price to: {min_price}")  # Debug print

    if user_input.get('max_price') and user_input['max_price'].strip() != "<empty string>":
        max_price = float(user_input['max_price'])  # Ensure it's a valid float
    print(f"Updated max_price to: {max_price}")  # Debug print

    
    # Construct the query with BETWEEN
    query += " AND CAST(price AS FLOAT) BETWEEN ? AND ?"
    params.extend([min_price, max_price])  # Add both min and max prices to params

    
    if user_input.get('state') and user_input['state'].strip() != "":
        query += " AND LOWER(state) LIKE LOWER(?)"
        params.append(f"%{user_input['state']}%")
    
    if user_input.get('carTitle') and user_input['carTitle'].strip() != "":
        query += " AND LOWER(title) LIKE LOWER(?)"
        params.append(f"%{user_input['carTitle']}%")
    
    if user_input.get('city') and user_input['city'].strip() != "":
        query += " AND LOWER(location) LIKE LOWER(?)"
        params.append(f"%{user_input['city'].lower()}%")
    
    if user_input.get('min_odometer') and user_input['min_odometer'].strip() != "":
        try:
            min_odometer = float(user_input['min_odometer'])
            query += " AND CAST(odometer AS FLOAT) >= ?"
            params.append(min_odometer)
            print(f"Added min_odometer filter: {min_odometer}")
        except ValueError:
            raise ValueError("Invalid min_odometer value. Expected a number.")
    
    if user_input.get('max_odometer') and user_input['max_odometer'].strip() != "":
        try:
            max_odometer = float(user_input['max_odometer'])
            query += " AND CAST(odometer AS FLOAT) <= ?"
            params.append(max_odometer)
            print(f"Added max_odometer filter: {max_odometer}")
        except ValueError:
            raise ValueError("Invalid max_odometer value. Expected a number.")
    
    if user_input.get('start_date') and user_input['start_date'].strip():
        try:
            start_date = datetime.strptime(user_input['start_date'], '%Y-%m-%d').date()
            query += " AND time_posted >= ?"
            params.append(start_date)
        except ValueError:
            raise ValueError("Invalid start date format. Expected YYYY-MM-DD.")
    
    if user_input.get('end_date') and user_input['end_date'].strip():
        try:
            end_date = datetime.strptime(user_input['end_date'], '%Y-%m-%d').date()
            query += " AND time_posted <= ?"
            params.append(end_date)
        except ValueError:
            raise ValueError("Invalid end date format. Expected YYYY-MM-DD.")
    
    # Add LIMIT to prevent overwhelming results -- nah -- on second thought yahh
    query += " LIMIT 2000"
    try:
        data = query_database(query, tuple(params))
        if not data:
            return jsonify({'message': 'No cars found matching criteria', 'count': 0}), 200  # Changed from 404 to 200
        return jsonify({'data': data, 'count': len(data)}), 200
        
    except Exception as e:
        return jsonify({'error': f"Database error: {str(e)}"}), 500



@app.route('/api/car_search_by_mileage', methods=['POST'])
def search_cars_by_mileage():
    user_input = request.get_json()
    
    # First query remains the same
    query = "SELECT * FROM carbitrage_table WHERE 1=1"
    params = []
    
    # Only add conditions for non-empty values
    if user_input.get('make') and user_input['make'].strip() != "":
        query += " AND make LIKE ?"
        params.append(f"%{user_input['make']}%")  # Using LIKE for partial matches
    
    if user_input.get('model') and user_input['model'].strip() != "":
        query += " AND model LIKE ?"
        params.append(f"%{user_input['model']}%")
    
    if user_input.get('state') and user_input['state'].strip() != "":
        query += " AND state LIKE ?"
        params.append(f"%{user_input['state']}%")
    
    # Add LIMIT to prevent overwhelming results
    query += " LIMIT 5000"
    try:
        # First query execution
        car_data = query_database(query, tuple(params))
        
        # Second query for mileage-based price analysis
        mileage_analysis_query = """
        WITH year AS (
            SELECT year
            FROM carbitrage_table
            WHERE 1=1
        """
        mileage_params = []
        
        # Add the same filters from the first query
        if user_input.get('make'):
            mileage_analysis_query += " AND make LIKE ?"
            mileage_params.append(f"%{user_input['make']}%")
        if user_input.get('model'):
            mileage_analysis_query += " AND model LIKE ?"
            mileage_params.append(f"%{user_input['model']}%")
        if user_input.get('state'):
            mileage_analysis_query += " AND state LIKE ?"
            mileage_params.append(f"%{user_input['state']}%")
            
        mileage_analysis_query += """
            GROUP BY year
        ),
        lessthan50k AS (
            SELECT year, ROUND(AVG(price), 2) as avg_lessthan50k
            FROM carbitrage_table
            WHERE odometer < 50000 AND price BETWEEN 1000 AND 79999
        """
        # Add the same filters here
        if user_input.get('make'):
            mileage_analysis_query += " AND make LIKE ?"
            mileage_params.append(f"%{user_input['make']}%")
        if user_input.get('model'):
            mileage_analysis_query += " AND model LIKE ?"
            mileage_params.append(f"%{user_input['model']}%")
        if user_input.get('state'):
            mileage_analysis_query += " AND state LIKE ?"
            mileage_params.append(f"%{user_input['state']}%")
            
        mileage_analysis_query += """
            GROUP BY year
        ),
        fiftyTo75k AS (
            SELECT year, ROUND(AVG(price), 2) as avg_fiftyTo75k
            FROM carbitrage_table
            WHERE odometer BETWEEN 50000 AND 74999 AND price BETWEEN 1000 AND 79999
        """
        # Add the same filters here
        if user_input.get('make'):
            mileage_analysis_query += " AND make LIKE ?"
            mileage_params.append(f"%{user_input['make']}%")
        if user_input.get('model'):
            mileage_analysis_query += " AND model LIKE ?"
            mileage_params.append(f"%{user_input['model']}%")
        if user_input.get('state'):
            mileage_analysis_query += " AND state LIKE ?"
            mileage_params.append(f"%{user_input['state']}%")
            
        mileage_analysis_query += """
            GROUP BY year
        ),
        seventy5To100k AS (
            SELECT year, ROUND(AVG(price), 2) as avg_seventy5To100k
            FROM carbitrage_table
            WHERE odometer BETWEEN 75000 AND 99999 AND price BETWEEN 1000 AND 79999
        """
        # Add the same filters here
        if user_input.get('make'):
            mileage_analysis_query += " AND make LIKE ?"
            mileage_params.append(f"%{user_input['make']}%")
        if user_input.get('model'):
            mileage_analysis_query += " AND model LIKE ?"
            mileage_params.append(f"%{user_input['model']}%")
        if user_input.get('state'):
            mileage_analysis_query += " AND state LIKE ?"
            mileage_params.append(f"%{user_input['state']}%")
            
        mileage_analysis_query += """
            GROUP BY year
        ),
        over100k AS (
            SELECT year, ROUND(AVG(price), 2) as avg_over100k
            FROM carbitrage_table
            WHERE odometer >= 100000 AND price BETWEEN 1000 AND 79999
        """
        # Add the same filters here
        if user_input.get('make'):
            mileage_analysis_query += " AND make LIKE ?"
            mileage_params.append(f"%{user_input['make']}%")
        if user_input.get('model'):
            mileage_analysis_query += " AND model LIKE ?"
            mileage_params.append(f"%{user_input['model']}%")
        if user_input.get('state'):
            mileage_analysis_query += " AND state LIKE ?"
            mileage_params.append(f"%{user_input['state']}%")
            
        mileage_analysis_query += """
            GROUP BY year
        )
        SELECT 
            year.year, 
            lessthan50k.avg_lessthan50k, 
            fiftyTo75k.avg_fiftyTo75k, 
            seventy5To100k.avg_seventy5To100k, 
            over100k.avg_over100k
        FROM year
        LEFT JOIN lessthan50k ON year.year = lessthan50k.year
        LEFT JOIN fiftyTo75k ON year.year = fiftyTo75k.year
        LEFT JOIN seventy5To100k ON year.year = seventy5To100k.year
        LEFT JOIN over100k ON year.year = over100k.year
        ORDER BY year.year DESC;
        """
        
        mileage_analysis_data = query_database(mileage_analysis_query, tuple(mileage_params))
        
        # Return combined results
        return jsonify({
            'car_data': car_data,
            'count': len(car_data),
            'mileage_analysis': mileage_analysis_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': f"Database error: {str(e)}"}), 500

#This query is totally fucked up
# Odometer is within 5k miles
@app.route('/api/car_search_by_unique_url', methods=['POST'])
def search_cars_by_url():
    passed_input = request.get_json()
    
    query = """
        WITH car_details AS (
        SELECT make, model, state, location, title, year, price, odometer, url
        FROM carbitrage_table 
        WHERE url = ?
        LIMIT 1
    ),
    avg_price AS (
    SELECT 
        ROUND(AVG(ct.price), 2) AS average_price,
        COUNT(*) AS total_similar_cars,
        ct.url,
        ct.model,
        ct.make,
        ct.title,
        ct.odometer
    FROM carbitrage_table ct
    JOIN car_details cd
        ON ct.make = cd.make
        AND ct.model = cd.model
        AND ct.year = cd.year
        AND ct.title = cd.title
    WHERE ct.odometer - cd.odometer <= ABS(5000)  -- Updated to include absolute value of 5000
)
   
    SELECT 
        cd.*,
        ap.average_price,
        ap.total_similar_cars
    FROM car_details cd
    CROSS JOIN avg_price ap;
    """
    
    try:
        data = query_database(query, (passed_input.get('url'),))
        if not data:
            return jsonify({'message': 'No cars found matching URL', 'count': 0}), 200
        return jsonify({'data': data, 'count': len(data)}), 200
        
    except Exception as e:
        return jsonify({'error': f"Database error: {str(e)}"}), 500


if __name__ == '__main__':
    # Start Flask development server when script is run directly
    app.run(debug=True, port=5000)
