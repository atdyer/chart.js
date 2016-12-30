var parseTime = d3.timeParse('%d-%b-%y');

d3.tsv('data/apple_stock.tsv', function ( d ) {

    d.date = parseTime(d.date);
    d.close = +d.close;
    return d;

}, function ( error, data ) {

    if ( error ) throw error;

    var width = d3.select('body')
        .node()
        .getBoundingClientRect().width;

    var chart = d3.chart()
        .width(width)
        .x_axis(d3.axisBottom())
        .y_axis(d3.axisLeft())
        .x(function ( d ) { return d.date; })
        .y(function ( d ) { return d.close; })
        .x_scale(d3.scaleTime());

    chart.scatter()
        .data(data)
        .attr('r', 1.5);

    d3.select('#chart')
        .call(chart);

});