var parseTime = d3.timeParse( '%d-%b-%y' );
var formatTime = d3.timeFormat( '%b %d, %Y' );

d3.tsv( 'data/apple_stock.tsv', function ( d ) {

    return { date: parseTime( d.date ), price: +d.close };

}, function ( error, data ) {

    if ( error ) throw error;

    var width = parseInt( d3.select( '#chart' ).style( 'width' ) );

    var chart = d3.chart()
        .width( width )
        .x( function ( d ) { return d.date; })
        .y( function ( d ) { return d.price; })
        .x_axis( d3.axisBottom() )
        .y_axis( d3.axisLeft() )
        .x_scale( d3.scaleTime() );

    var line = chart.line()
        .data( data )
        .attr( 'stroke-width', 1.5 )
        .hover( function ( d, i, data, dot ) {

            legend.item( formatTime( d.date ) + ': $' + d.price, line );

            d3.select( dot ).attr( 'r', 5 );
            d3.select( '#chart' ).call( chart );

        })
        .hover_out( function () {

            legend.item( 'AAPL', line );
            d3.select( '#chart' ).call( chart );

        });

    var legend = chart.legend()
        .location( 'nw' )
        .item( 'AAPL', line );

    d3.select( '#chart' )
        .call( chart );

});