var parseTime = d3.timeParse( "%Y%m%d" );

d3.tsv( 'data/cities.tsv', type, function ( error, data ) {

    if ( error ) throw error;

    var cities = data.columns.slice( 1 )
                     .map( function ( id ) {
                         return {
                             id: id,
                             values: data.map( function ( d ) {
                                 return { date: d.date, temperature: d[ id ] };
                             } )
                         };
                     } );

    var width = d3.select( 'body' )
                  .node()
                  .getBoundingClientRect().width;

    var c = chart()
        .width( width )
        .x_scale( d3.scaleTime() )
        .x( function ( d ) {
            return d.date;
        } )
        .y( function ( d ) {
            return d.temperature;
        } );

    c.line()
     .data( cities[ 0 ].values )
     .hover( true );

    c.line()
     .data( cities[ 1 ].values )
     .hover( true );

    c.line()
     .data( cities[ 2 ].values );

    d3.select( '#chart' )
      .call( c );

} );

function type( d, _, columns ) {
    d.date = parseTime( d.date );
    for ( var i = 1, n = columns.length, c; i < n; ++i ) d[ c = columns[ i ] ] = +d[ c ];
    return d;
}