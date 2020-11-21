// @TODO: YOUR CODE HERE!

// Define SVG Area Dimensions
let svgWidth = 950;
let svgHeight = 600;

// Define chart margins as object
let chartMargin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 110
};

// Define dimensions of chart area
let chartWidth = svgWidth - chartMargin.left - chartMargin.right;
let chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select id "scatter", append svg area & set dimensions
let svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Append group to SVG area: shift ('translate') right & down coinciding w/ "chartMargin" object
 let chartGroup = svg.append("g")
    .attr("transform",`translate(${chartMargin.left}, ${chartMargin.top})`);

// Import csv data
d3.csv("assets/data/data.csv")
    .then(function(riskData){
    //Print Data
    //console.log(data);

    // Pull health & poverty values from csv file
    riskData.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
        data.abbr = data.abbr;
        data.income = +data.income;
    });

// Scale x to chart height
let xScale = d3.scaleLinear()
    .domain([8.5, d3.max(riskData, d => d.poverty)])
    .range([chartWidth, 0]);
    
// Scale y to chart width
let yScale = d3.scaleLinear()
    .domain([3.5, d3.max(riskData, d => d.healthcare)])
    .range([0, chartHeight]);
 
// Create Axis
let xAxis = d3.axisLeft(xScale);
let yAxis = d3.axisBottom(yScale);

// Set x axis to bottom of chart
chartGroup.append("g")
.attr("transform", `translate(0, ${chartHeight})`)
.call(xAxis);

// Set y axis
chartGroup.append("g")  
.call(yAxis);

// Append circle data to chartGroup
let circlesGroup = chartGroup.selectAll("circle")
    .data(riskData)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", 10)
    .attr("fill", "lightblue")
    .attr("opacity", ".6")
    .attr("stroke-width", "1")
    .attr("stroke", "black");
  
    chartGroup.select("g")
    .selectAll("circle")
    .data(riskData)
    .enter()
    .append("text")
    .text(d => d.abbr)
    .attr("x", d => xScale(d.poverty))
    .attr("y", d => yScale(d.healthcare))
    .attr("dy",-395)
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("fill", "black");
       
    console.log(riskData);
chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - 50)
    .attr("x", 0 -250)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");
  
chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2.5}, ${chartHeight + margin.top + 25})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");
  });
//  }
 // makeResponsive();
