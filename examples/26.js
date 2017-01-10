d3.tsv("data/letters.tsv", function(d) {

    d.frequency = +d.frequency;
    return d;

}, function(error, data) {

    if (error) throw error;

    var width = parseInt(d3.select('#chart').style('width'));
    var domain = data.map( function ( d ) { return d.letter; } );
    var range = [0, d3.max( data, function ( d ) { return d.frequency; } ) ];

    var chart = d3.chart()
                  .width(width)
                  .x(function ( d ) { return d.letter; })
                  .y(function ( d ) { return d.frequency; })
                  .x_axis(d3.axisBottom())
                  .y_axis(d3.axisLeft().ticks(10, '%'))
                  .x_scale(d3.scaleBand().round(true).padding(0.1))
                  .domain(domain)
                  .range(range)
                  .hover( true );

    chart.bar()
         .data( data );

    d3.select('#chart').call(chart);

});