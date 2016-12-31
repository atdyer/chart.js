var parseTime = d3.timeParse('%d-%b-%y');
var width = parseInt(d3.select('#chart').style('width'));

d3.tsv('data/apple_stock.tsv', function ( d ) {

    return [parseTime(d.date), +d.close];

}, function ( error, data ) {

    if ( error ) throw error;

    var chart = d3.chart()
        .width(width)
        .x_axis(d3.axisBottom())
        .y_axis(d3.axisLeft())
        .x_label('Date')
        .y_label('Price ($)')
        .x_scale(d3.scaleTime());

    chart.line()
        .data(data);

    d3.select('#chart')
        .call(chart);

});