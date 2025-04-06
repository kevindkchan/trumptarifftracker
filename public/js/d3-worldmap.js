const width = 960;
const height = 700;

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

const projection = d3.geoMercator()
    .scale(120)
    .translate([width / 2.5, height / 2]);

const path = d3.geoPath().projection(projection);

const color = d3.scaleThreshold()
    .domain([10, 20, 30, 40, 50])
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

        const thresholds = [10, 20, 30, 40, 50];
        const colors = color.range();

        const legendContainer = d3.select("#legend");

        legendContainer.style("position", "relative")
        .style("width", "100%")
        .style("height", "20px")
        .style("background", `linear-gradient(to right, ${colors.join(", ")})`)
        .style("margin-bottom", "8px");

        const legendScale = d3.scaleLinear()
        .domain([thresholds[0], thresholds[thresholds.length - 1]])
        .range([0, 100]);

        const legendAxis = d3.select("#legend")
        .append("div")
        .style("display", "flex")
        .style("justify-content", "space-between")
        .style("width", "100%")
        .style("font-size", "12px")
        .style("color", "#333");

        thresholds.forEach((t, i) => {
            legendAxis.append("div")
                .style("text-align", "center")
                .style("width", `${100 / (thresholds.length - 1)}%`)
                .text(i === thresholds.length - 1 ? `${t}%+` : `${t}%`);
        });
});
