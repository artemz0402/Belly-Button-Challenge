// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const metadata = data.metadata;
    const sampleMetadata = metadata.find(sampleObj => sampleObj.id == sample);

    const panel = d3.select("#sample-metadata");
    panel.html("");

    Object.entries(sampleMetadata).forEach(([key, value]) => {
      panel.append("p").text(`${key}: ${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const samples = data.samples;
    const sampleData = samples.find(sampleObj => sampleObj.id == sample);

    const otuIds = sampleData.otu_ids;
    const otuLabels = sampleData.otu_labels;
    const sampleValues = sampleData.sample_values;

    const bubbleChart = document.getElementById("bubble");
    const bubbleData = [{
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds
      }
    }];
    Plotly.newPlot(bubbleChart, bubbleData);

    const barYticks = otuIds.map(id => `OTU ${id}`);

    const barChart = document.getElementById("bar");
    const barData = [{
      x: sampleValues.slice(0, 10).reverse(),
      y: barYticks.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    }];
    Plotly.newPlot(barChart, barData);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    const names = data.names;
    const dropdown = d3.select("#selDataset");

    names.forEach(name => {
      dropdown.append("option").text(name).property("value", name);
    });

    const firstSample = names[0];
    buildMetadata(firstSample);
    buildCharts(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();

