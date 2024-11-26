function getUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const data = {};
    for (const [key, value] of params) {
        data[key] = decodeURIComponent(value);
    }
    return data;
}

function navigateTo(page, params = {}) {
    // Convert the params object to URL parameters
    const queryString = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
    
    // Add the parameters to the URL if they exist
    const url = queryString ? `${page}?${queryString}` : page;
    window.location.href = url;
}


async function getCarDataByUrl() {
    try {
        // Get URL parameters
        const params = getUrlParameters();
        
        if (!params.url) {
            console.error('No URL parameter provided');
            return;
        }

        // Make POST request to API endpoint
        const response = await fetch('http://localhost:5000/api/car_search_by_unique_url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: params.url
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.count === 0) {
            console.log('No cars found matching URL');
            return;
        }

        // Get the car data
        const carData = result.data[0];

        // Update the header elements with car data
        document.getElementById('car_make').textContent = `Make: ${(carData.make || 'N/A').charAt(0).toUpperCase() + (carData.make || 'N/A').slice(1)}`;
        document.getElementById('car_model').textContent = `Model: ${(carData.model || 'N/A').charAt(0).toUpperCase() + (carData.model || 'N/A').slice(1)}`;
        document.getElementById('car_year').textContent = `Year: ${carData.year || 'N/A'}`;
        document.getElementById('car_odometer').textContent = `Odometer: ${Number(carData.odometer || 0).toLocaleString()} Miles`;
        document.getElementById('car_state').textContent = `State: ${(carData.state || 'N/A').charAt(0).toUpperCase() + (carData.state || 'N/A').slice(1)}`;
        document.getElementById('car_city').textContent = `City: ${(carData.location || 'N/A').charAt(0).toUpperCase() + (carData.location || 'N/A').slice(1)}`;
        document.getElementById('car_title').textContent = `Title: ${(carData.title || 'N/A').charAt(0).toUpperCase() + (carData.title || 'N/A').slice(1)}`;
        document.getElementById('car_price').textContent = `Price: $${Number(carData.price || 0).toLocaleString()}`;
        
        // Update the car count paragraph with HTML for underlining
        const lowerBound = Number(carData.odometer) - 5000;
        const upperBound = Number(carData.odometer) + 5000;
        document.getElementById('car_count_p').innerHTML = `The count of ${(carData.title || 'N/A Title').charAt(0).toUpperCase() + (carData.title || 'N/A Title').slice(1)} ${(carData.make || 'N/A Make').charAt(0).toUpperCase() + (carData.make || 'N/A Make').slice(1)}(s) ${(carData.model || 'N/A Model').charAt(0).toUpperCase() + (carData.model || 'N/A Model').slice(1)}(s) between ${lowerBound.toLocaleString()} and ${upperBound.toLocaleString()} is <u>${Number(carData.total_similar_cars || 0).toLocaleString()}</u> cars.`;
        // Create the graph with proper data structure
        const sampleData = [
            { category: "This Car Price", value: Number(carData.price || 0) },
            { category: "Average Car Price*", value: Number(carData.average_price || 0) }
        ];
        createBarGraph(sampleData, "#barGraph");

    } catch (error) {
        console.error('Error fetching car data:', error);
    }
}



// Event listener for DOMContentLoaded to initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOM loaded, initializing application...');
    
    // Get URL parameters if any
    const params = getUrlParameters();
    console.log('URL Parameters:', params);

    getCarDataByUrl();
    
    if (params.url) {
        // Update the "To Posting" link with the URL from parameters
        document.getElementById('to_posting_link').href = decodeURIComponent(params.url);
    }


    
     // Sample data
     const sampleData = [
        {category: "Car Price", value: 100},
        {category: "50-75k", value: 120},
        {category: "75-100k", value: 31},
        {category: ">100k", value: 40}
    ];

    
   

});

function createBarGraph(data, containerId) {
    d3.select(containerId).html("");
    
    // Set up the graph dimensions and margins
    const margin = {top: 10, right: 20, bottom: 30, left: 90};
    const width = 800 - margin.left - margin.right;
    const height = 625 - margin.top - margin.bottom;

    // Create the SVG container
    const svg = d3.select(containerId)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleBand()
        .range([0, width])
        .padding(0.2);

    const y = d3.scaleLinear()
        .range([height, 0]);

    // Set domains
    x.domain(data.map(d => d.category));
    y.domain([0, d3.max(data, d => d.value)]);

    //

     // Add X axis with animation
     svg.append("g")
     .attr("transform", `translate(0,${height})`)
     .call(d3.axisBottom(x))
     .selectAll("text")
     .style("fill", "white")
     .style("opacity", 0)  // Start invisible
     .style("font-size", "22px")  // Change font size
     .style("font-family", "Lato, sans-serif")  // Changed font to Lato
     .transition()
     .duration(1000)
     .style("opacity", 1); // Fade in

 // Add Y axis with animation
 svg.append("g")
     .call(d3.axisLeft(y)
         .tickFormat(d => `$${d / 1000}k`)  // Format Y axis labels in thousands
         .tickValues([0, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000]) // Specify custom tick values
     )  
     .selectAll("text")
     .style("fill", "white")
     .style("opacity", 0)  // Start invisible
     .style("font-size", "20px")  // Change font size
     .style("font-family", "Lato, sans-serif")  // Changed font to Lato
     .transition()
     .duration(1000)
     .style("opacity", 1); // Fade in

 // Add bars with animation
 svg.selectAll(".bar")
     .data(data)
     .enter()
     .append("rect")
     .attr("class", "bar")
     .attr("x", d => x(d.category))
     .attr("width", x.bandwidth())
     .attr("y", height)  // Start from bottom
     .attr("height", 0)  // Start with height 0
     .attr("fill", (d, i) => i === 0 ? (data[0].value < data[1].value ? "#E3B505" : "#645002") : "#1C6DD0")  // Conditional color
     .transition()  // Add transition
     .duration(1500)  // Animation duration in milliseconds
     .delay((d, i) => i * 200)  // Stagger the animations
     .attr("y", d => y(d.value))  // Animate to final position
     .attr("height", d => height - y(d.value));

 // Add Y axis label with animation
 svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left + 3)  // Adjust Y position (move down)
     .attr("x", 0 - (height / 2))
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .style("fill", "white")
     .style("opacity", 0)  // Start invisible
     .style("font-size", "22px")  // Change font size for label
     .style("font-family", "Lato, sans-serif")  // Changed font to Lato
     .text("Price")
     .transition()
     .duration(1000)
     .style("opacity", 1); // Fade in
}
