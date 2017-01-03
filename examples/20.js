var parseDate = d3.timeParse("%Y%m%d");
var width = parseInt(d3.select('#chart').style('width'));

d3.tsv("data/temperature.tsv", function(error, data) {

    if ( error ) throw error;

    data.forEach( function ( d ) {
        d.date = parseDate( d.date );
        d.low = +d.low;
        d.high = +d.high;
    });

    var chart = d3.chart()
        .width(width)
        .x_axis(d3.axisBottom())
        .y_axis(d3.axisLeft())
        .x_scale(d3.scaleTime())
        .y_label('Temperature (ºF)');

    chart.area()
         .data(data)
         .x(function ( d ) { return d.date; })
         .y0(function ( d ) { return d.low; })
         .y1(function ( d ) { return d.high; });

    d3.select('#chart')
        .call(chart);

});
