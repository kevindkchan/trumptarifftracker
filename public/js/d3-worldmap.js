const width = 960;
const height = 500;

const tariffData = {
    "840": 0,    // USA
    "156": 34,   // China
    "392": 24,   // Japan
    "158": 32,   // Taiwan
    "276": 20,   // Germany
    "250": 20,   // France
    "380": 20,   // Italy
    "724": 20,   // Spain
    "124": 25,   // Canada
    "484": 25    // Mexico
};

const svg = d3.select("#d3-world-map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

const projection = d3.geoEqualEarth()
    .scale(160)
    .translate([width / 2.5, height / 2]);

const path = d3.geoPath().projection(projection);

const color = d3.scaleThreshold()
    .domain([1, 10, 20, 30, 40])
    .range(["#ffecd7", "#ffdcb4", "#ffcd94", "#ffb968", "#ffa237", "#ff8800"]);

d3.json("https://unpkg.com/world-atlas@2/countries-110m.json").then(worldData => {
    const countries = topojson.feature(worldData, worldData.objects.countries).features;

    svg.append("g")
        .selectAll("path")
        .data(countries)
        .join("path")
        .attr("d", path)
        .attr("fill", d => {
        const rate = tariffData[d.id];
        return rate !== undefined ? color(rate) : "#eee";
        })
        .attr("stroke", "#999")
        .append("title")
        .text(d => {
        const rate = tariffData[d.id];
        return d.properties.name + (rate !== undefined ? `: ${rate}% tariff` : ': no data');
        });

        const thresholds = [1, 10, 20, 30, 40];
        const colors = color.range();

        const legendContainer = d3.select("#legend");

        thresholds.forEach((t, i) => {
        const min = thresholds[i];
        const max = thresholds[i + 1] || "40+";

        const label = i === thresholds.length - 1 ? `${min}+%` : `${min}–${max}%`;

        legendContainer.append("div")
            .style("background", colors[i])
            .style("padding", "6px 10px")
            .style("color", "#000")
            .style("font-size", "12px")
            .text(label);
        });

});
