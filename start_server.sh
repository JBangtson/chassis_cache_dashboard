#!/bin/bash
# Navigate to the project directory
cd /f/chassis_cache_dashboard || exit

# Run npm start
npm start &

# Wait for a moment to ensure the server starts
sleep 5

# Open the browser to localhost:3000
"/c/Program Files/Mozilla Firefox/firefox.exe" http://localhost:3000 &

#   "C:\Program Files\Git\bin\bash.exe" --login -i -c "F:/chassis_cache_dashboard/start_server.sh" 