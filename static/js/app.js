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

    // BONUS: Create Gauge
    function createGauge(wfreq) {
      var value = resultSamples.wfreq;
    }
  });
}

// Create Charts
function compileCharts(sample) {

  // Get Data
  d3.json("data/samples.json").then((data) => {
    var dataSamples = data.samples;

    var objectSamples = dataSamples.filter(objectSamples => objectSamples.id === sample);

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
      title: "Top 10 Bacteria",
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
        color: otu_ids,
        colorscale: "Earth",
        type: "heatmap"
      }
    }]

    let bubbleLayout = {
      title: "Bacteria per Sample",
      hovermode: "closest"
    }

    Plotly.newPlot("bubble", bubbleData, bubbleLayout)

    // BONUS: Gauge
    var wfreq = resultSamples.wfreq;

    let gaugeData = [{
      
      domain: { x: [0, 1], y: [0, 1] },
      title: "<span style='font-weight:bold'>Belly Button Washing Frequency</span><br>Scrubs per Week",
      type: "indicator",
      mode: "gauge",
      gauge: {
        axis: {
          range: [null, 9],
          ticks: "",
          visible: false
        },
        steps: [
          { range: [0, 1], color: "#ffffe5" },
          { range: [1, 2], color: "#f7fcd9" },
          { range: [2, 3], color: "#d9f0a3" },
          { range: [3, 4], color: "#addd8e" },
          { range: [4, 5], color: "#78c679" },
          { range: [5, 6], color: "#41ab5d" },
          { range: [6, 7], color: "#238443" },
          { range: [7, 8], color: "#006837" },
          { range: [8, 9], color: "#004529" },
        ]
      },
    }];

    let gaugeLayout = {
      width: 600,
      height: 450,
      margin: { t: 0, b: 0 },
    };

    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
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