var parseTime = d3.timeParse("%Y%m%d");
var width = parseInt(d3.select('#chart').style('width'));

d3.tsv('data/cities.tsv', type, function ( error, data ) {

    if ( error ) throw error;

    var cities = data.columns.slice(1)
        .map(function ( id ) {
            return {
                id: id,
                values: data.map(function ( d ) {
                    return { date: d.date, temperature: d[ id ] };
                })
            };
        });


    var chart = d3.chart()
        .width(width)
        .x_axis(d3.axisBottom())
        .y_axis(d3.axisLeft())
        .x_scale(d3.scaleTime())
        .x(function ( d ) { return d.date; })
        .y(function ( d ) { return d.temperature; });

    var line1 = chart.line()
        .data(cities[ 0 ].values)
        .attr('stroke-width', 1.5);

    var line2 = chart.line()
        .data(cities[ 1 ].values)
        .attr('stroke-width', 1.5);

    var line3 = chart.line()
        .data(cities[ 2 ].values)
        .attr('stroke-width', 1.5);

    chart.legend()
        .container(d3.select('#legend'))
        .location('nw')
        .item( cities[0].id, line1 )
        .item( cities[1].id, line2 )
        .item( cities[2].id, line3 );

    d3.select('#chart')
        .call(chart);

});

function type( d, _, columns ) {
    d.date = parseTime(d.date);
    for ( var i = 1, n = columns.length, c; i < n; ++i ) d[ c = columns[ i ] ] = +d[ c ];
    return d;
}