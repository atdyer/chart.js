var parseTime = d3.timeParse( "%Y%m%d" );
var formatTime = d3.timeFormat( '%B %d, %Y' );

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

    var city1 = d3.select( '#city1' )
                  .style( 'flex', '1 0 auto' );
    var city2 = d3.select( '#city2' )
                  .style( 'flex', '1 0 auto' );
    var city3 = d3.select( '#city3' )
                  .style( 'flex', '1 0 auto' );
    city1.append( 'h2' )
         .text( cities[ 0 ].id );
    city2.append( 'h2' )
         .text( cities[ 1 ].id );
    city3.append( 'h2' )
         .text( cities[ 2 ].id );
    city1 = city1.append( 'pre' )
                 .append( 'code' )
                 .attr( 'class', 'json' )
                 .style( 'font-size', '12px' );
    city2 = city2.append( 'pre' )
                 .append( 'code' )
                 .attr( 'class', 'json' )
                 .style( 'font-size', '12px' );
    city3 = city3.append( 'pre' )
                 .append( 'code' )
                 .attr( 'class', 'json' )
                 .style( 'font-size', '12px' );

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

    c.scatter()
     .data( cities[ 0 ].values )
     .radius( 1.5 )
     .hover( function ( d ) {
         print_data( d, city1 );
     } );

    c.line()
     .data( cities[ 1 ].values )
     .hover( function ( d ) {
         print_data( d, city2 );
     } );

    c.line()
     .data( cities[ 2 ].values )
     .hover( function ( d ) {
         print_data( d, city3 );
     } );

    d3.select( '#chart' )
      .call( c );

} );

function print_data( data, element ) {
    var d = {
        date: formatTime( data.x ),
        temperature: data.y
    };
    element.text( JSON.stringify( d, null, 2 ) );
    hljs.highlightBlock( element.nodes()[ 0 ] );
}

function type( d, _, columns ) {
    d.date = parseTime( d.date );
    for ( var i = 1, n = columns.length, c; i < n; ++i ) d[ c = columns[ i ] ] = +d[ c ];
    return d;
}