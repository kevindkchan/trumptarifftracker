const width = 960;
const height = 700;

const tariffData = {
    "076": 15,   // Brazil
    "124": 25,   // Canada
    "156": 145,  // China
    "356": 30,   // India
    "392": 20,   // Japan
    "458": 10,   // Malaysia
    "484": 25,   // Mexico
    "702": 10,   // Singapore
    "410": 18,   // South Korea
    "756": 10,   // Switzerland
    "158": 15,   // Taiwan
    "764": 10,   // Thailand
    "826": 18,   // United Kingdom
    "704": 12,   // Vietnam

    // EU
    "040": 20,  // Austria
    "056": 20,  // Belgium
    "100": 20,  // Bulgaria
    "191": 20,  // Croatia
    "196": 20,  // Cyprus
    "203": 20,  // Czechia
    "208": 20,  // Denmark
    "233": 20,  // Estonia
    "246": 20,  // Finland
    "250": 20,  // France
    "276": 20,  // Germany
    "300": 20,  // Greece
    "348": 20,  // Hungary
    "372": 20,  // Ireland
    "380": 20,  // Italy
    "428": 20,  // Latvia
    "440": 20,  // Lithuania
    "442": 20,  // Luxembourg
    "470": 20,  // Malta
    "528": 20,  // Netherlands
    "616": 20,  // Poland
    "620": 20,  // Portugal
    "642": 20,  // Romania
    "703": 20,  // Slovakia
    "705": 20,  // Slovenia
    "724": 20,  // Spain
    "752": 20   // Sweden
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
