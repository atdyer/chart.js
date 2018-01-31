var parseTime = d3.timeParse('%d-%b-%y');

d3.tsv('data/apple_stock.tsv', function ( d ) {

    return [ parseTime(d.date), 1000 * d.close ];

}, function ( error, data ) {

    if ( error ) throw error;

    var width = parseInt(d3.select('#chart').style('width'));

    var chart = d3.chart()
        .width(width)
        .x_axis(d3.axisBottom())
        .y_axis(d3.axisLeft())
        .x_scale(d3.scaleTime())
        .margin({left: 50});

    chart.line()
        .data(data)
        .attr('stroke-width', 1.5);

    d3.select('#chart')
        .call(chart);

});