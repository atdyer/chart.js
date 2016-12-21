var parseTime = d3.timeParse("%Y%m%d");

d3.tsv( 'data/cities.tsv', type, function ( error, data ) {

    if ( error ) throw error;

    var cities = data.columns.slice(1).map(function(id) {
        return {
            id: id,
            values: data.map(function(d) {
                return {date: d.date, temperature: d[id]};
            })
        };
    });

    var width = d3.select( 'body' ).node().getBoundingClientRect().width;
    var height = 175;

    var c1 = chart()
        .width( width )
        .height( height )
        .x_scale( d3.scaleTime() )
        .x( function ( d ) { return d.date; } )
        .y( function ( d ) { return d.temperature; } );

    var c2 = chart()
        .width( width )
        .height( height )
        .x_scale( d3.scaleTime() )
        .x( function ( d ) { return d.date; } )
        .y( function ( d ) { return d.temperature; } );

    var c3 = chart()
        .width( width )
        .height( height )
        .x_scale( d3.scaleTime() )
        .x( function ( d ) { return d.date; } )
        .y( function ( d ) { return d.temperature; } );

    c1.line()
      .data( cities[0].values )
      .hover( true );

    c2.line()
      .data( cities[1].values )
      .color( "#e41a1c" )
      .hover( true );

    c3.line()
      .data( cities[2].values )
      .color( "#4daf4a" )
      .hover( true );

    var link = chart.linker();
    link.link( c1 );
    link.link( c2 );
    link.link( c3 );

    d3.select( '#chart1' ).call( c1 );
    d3.select( '#chart2' ).call( c2 );
    d3.select( '#chart3' ).call( c3 );

});

function type(d, _, columns) {
    d.date = parseTime(d.date);
    for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
    return d;
}