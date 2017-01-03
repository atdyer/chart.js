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

    chart.area()
        .data(data.slice(0,25))
        .y0(function ( d ) { return d[1]-5;})
        .attr('fill', 'steelblue')
        .attr('fill-opacity', 0.85)
        .attr('stroke-width', 2.0)
        .attr('stroke', 'black')
        .attr('stroke-dasharray', '20,10');

    d3.select('#chart')
        .call(chart);

});