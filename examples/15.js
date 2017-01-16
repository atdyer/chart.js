var parseTime = d3.timeParse('%d-%b-%y');

d3.tsv('data/apple_stock.tsv', function ( d ) {

    return [ parseTime(d.date), +d.close ];

}, function ( error, data ) {

    if ( error ) throw error;

    var width = parseInt(d3.select('#chart').style('width'));

    var chart = d3.chart()
        .width(width)
        .x_axis(d3.axisBottom())
        .y_axis(d3.axisLeft())
        .x_scale(d3.scaleTime());

    chart.scatter()
        .data(data.slice(0,25))
        .attr('r', function ( d ) { return 4.5 + Math.pow(d[1]/100.0, 20); })
        .attr('fill', 'steelblue')
        .attr('fill-opacity', 0.85)
        .attr('stroke', 'black')
        .attr('stroke-opacity', 0.65)
        .attr('stroke-width', 1.5)
        .hover(function (d, i, nodes) {
            var radius = +d3.select(nodes[i]).attr('r') + 4;
            d3.select(this)
                .style('transition', 'stroke-dashoffset 0.1s ease-in, r 0.1s ease-in')
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('stroke-width', 1.5)
                .attr('stroke-dashoffset', radius)
                .attr('stroke-dasharray', '2%,1%')
                .attr('r', radius);
        });

    d3.select('#chart')
        .call(chart);

});