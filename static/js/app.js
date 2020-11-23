// Create Function to Read JSON file
function compileData(sample) {

  // D3 to Retrieve Data with "then" 
  d3.json("data/samples.json").then((data) => {

    var dataSamples = data.metadata;

    // Filter Data
    var objectSamples = dataSamples.filter(objectSamples => objectSamples.id == sample);

    var resultSamples = objectSamples[0];

    console.log(objectSamples);

    // Retrieve Demo Panel (Dropdown)
    var dashBoard = d3.select("#sample-metadata");

    // Clear Info
    dashBoard.html("");

    // Retrieve Keys & Values
    Object.entries(resultSamples).forEach(([key, value]) => {
      dashBoard.append("h6").text(`${key.toUpperCase()} : ${value}`);
    });

    // create gauge info
    // (resultSamples.wfreq

  });
}

// Create Charts
function compileCharts(sample) { 

  // Get Data
  d3.json("data/samples.json").then((data) => {
    var dataSamples = data.samples;

    var objectSamples = dataSamples.filter(objectSamples => objectSamples.id == sample);

    var resultSamples = objectSamples[0];

    // Constants for All Charts
    const sample_values = resultSamples.sample_values;
    const otu_ids = resultSamples.otu_ids;
    const otu_labels = resultSamples.otu_labels;

    console.log("compileCharts output");
 
    // Bar Chart
    let barData = [{
      text: otu_labels,
      x: sample_values.slice(0, 10).reverse(),
      y: otu_ids.slice(0, 10).map(x => `OTU ${x}`).reverse(),
      type: "bar",
      orientation: "h"
    }]
    
    let barLayout = {
      title: "Bar Chart",
      hovermode: "closest"
    }

    Plotly.newPlot("bar", barData, barLayout)


    // Bubble Chart
    let bubbleData = [{
    text: otu_labels,
    x: otu_ids,
    y: sample_values,
    mode: "markers",
    marker: {
      size: sample_values,
      color: otu_ids
      }
    }]

    let bubbleLayout = {
      title: "Bubble Chart",
      hovermode: "closest"
    }

    Plotly.newPlot("bubble", bubbleData, bubbleLayout)
  
  })

}
// Event Listener
function optionChanged(nextSample) {

  // Data from Selector (i.e. sample value)
  compileData(nextSample);
  console.log(nextSample);
  compileCharts(nextSample);
};

// Create function "init"
function init() {
  console.log("Start init() function");

  // Reference Dropdown Selector (selector id = "#selDataset")
  var selector = d3.select("#selDataset");


  // Create Dropdown Menu with Sample Names
  // => Set initial value ("940")
  d3.json("data/samples.json").then((data) => {
    var sampleNames = data.names;
    console.log(sampleNames);

    // forEach to Retrieve All Sample Names
    sampleNames.forEach((sample) => {
      selector.append("option")
        .text(sample)
        .property("value", sample)
    });

    var firstSample = sampleNames[0];




    compileData(firstSample)

    compileCharts(firstSample)





  });

}

// Call function "init"
init();