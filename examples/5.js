var parseTime = d3.timeParse("%Y%m%d");

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

    var height = 175;
    var width = d3.select('body')
                  .node()
                  .getBoundingClientRect().width;

    var linker = chart.linker();

    d3.select('#chart')
        .selectAll('div')
        .data(cities)
        .enter()
        .append('div')
        .each( function ( d ) {

            var c = chart()
                .width(width)
                .height(height)
                .x_axis(d3.axisBottom())
                .y_axis(d3.axisLeft())
                .x_scale(d3.scaleTime())
                .x(function ( d ) { return d.date; })
                .y(function ( d ) { return d.temperature; });

            c.line()
                .data(d.values)
                .hover(true);

            linker.link(c);

            c(d3.select(this));

        });

});

function type( d, _, columns ) {
    d.date = parseTime(d.date);
    for ( var i = 1, n = columns.length, c; i < n; ++i ) d[ c = columns[ i ] ] = +d[ c ];
    return d;
}