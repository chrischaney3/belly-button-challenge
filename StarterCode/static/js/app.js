// Place a constant variable to hold URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Import sample data
d3.json(url).then(function(data) {
  console.log(data);
});

// Dashboard
function init() {

    // Select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {
        
        // Sample Names
        let names = data.names;
        //Loop for gathering inputs
        names.forEach((id) => {

            
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Setting sample_one
        let sample_one = names[0];

        console.log(sample_one);

        // Building plots and other functions
        buildMetadata(sample_one);
        buildBar(sample_one);
        buildBubble(sample_one);
        buildGauge(sample_one);

    });
};

//Metadata
function buildMetadata(sample) {

    // Retrieve metadata
    d3.json(url).then((data) => {

        let metadata = data.metadata;

        // Filtering samples
        let value = metadata.filter(result => result.id == sample);

        // Creating an array for filter
        console.log(value)

        let valueData = value[0];

        // Clearing out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Log the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// Bar Chart
function buildBar(sample) {

    // Retrieve Data
    d3.json(url).then((data) => {

        // Retrieving sample data 
        let sampleInfo = data.samples;

        let value = sampleInfo.filter(result => result.id == sample);

        // Adding array
        let valueData = value[0];

        // Otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);

        // adding items to display in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Set up the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h",
            colors: "red"
        };

        // Setup the layout
        let layout = {
            title: "Top 10 Samples"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Bubble chart
function buildBubble(sample) {

    // Retrieve Data
    d3.json(url).then((data) => {
        
        // Adding sample data
        let sampleInfo = data.samples;

        // Filtering data
        let value = sampleInfo.filter(result => result.id == sample);

        // Adding in array
        let valueData = value[0];

        // Otu_ids, lables, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids,otu_labels,sample_values);
        
        // Bubble chart details
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Reds"
            }
        };

        // Bubble layout
        let layout = {
            title: "Bacteria Comparisons",
            hovermode: "closest",
            xaxis: {title: "OTU_ID"},
        };

        // Plotly bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Function for toggling samples
function optionChanged(value) { 

    console.log(value); 

    // Change functions based on values 
    buildMetadata(value);
    buildBar(value);
    buildBubble(value);
    buildGauge(value);
};

init();