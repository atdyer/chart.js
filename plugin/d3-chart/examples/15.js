var parseTime = d3.timeParse('%d-%b-%y');

d3.tsv('data/apple_stock.tsv', function ( d ) {

    return [ parseTime(d.date), +d.close ];

}, function ( error, data ) {

    if ( error ) throw error;

    var width = d3.select('body')
        .node()
        .getBoundingClientRect().width;

    var c = d3.chart()
        .width(width)
        .x_axis(d3.axisBottom())
        .y_axis(d3.axisLeft())
        .x_scale(d3.scaleTime());

    c.scatter()
        .data(data.slice(0,25))
        .attr('r', function ( d ) { return 4.5 + Math.pow(d[1]/100.0, 20); })
        .attr('fill', 'steelblue')
        .attr('fill-opacity', 0.85)
        .attr('stroke', 'black')
        .attr('stroke-opacity', 0.45)
        .attr('stroke-width', 1.5)
        .attr('stroke-dasharray', '10,4')
        .hover(true);

    d3.select('#chart')
        .call(c);

});