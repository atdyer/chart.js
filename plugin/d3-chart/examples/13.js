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

    c.line()
        .data(data.slice(0,25))
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 5.0)
        .attr('opacity', 0.85)
        .attr('stroke-dasharray', '15,10')
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round');

    d3.select('#chart')
        .call(c);

});