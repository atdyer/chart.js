var parseTime = d3.timeParse( '%d-%b-%y' );
var formatTime = d3.timeFormat( '%b %d, %Y' );
var width = parseInt( d3.select( '#chart' ).style( 'width' ) );

d3.tsv( 'data/apple_stock.tsv', function ( d ) {

    return { date: parseTime( d.date ), price: +d.close };

}, function ( error, data ) {

    if ( error ) throw error;

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
        .hover( show_price )
        .hover_out( hide_price );

    var legend = chart.legend()
        .location( 'nw' )
        .item( 'AAPL', line );

    d3.select( '#chart' )
        .call( chart );

    function show_price ( d, dot ) {

        var date = formatTime(d.date);
        var price = '$' + d.price.toFixed(2);

        legend.item( date + ': ' + price, line );

        d3.select( dot )
            .attr( 'r', 5 )
            .attr( 'stroke', line.attr( 'stroke' ) )
            .attr( 'stroke-width', line.attr( 'stroke-width' ) )
            .attr( 'fill', 'white' )
            .attr( 'fill-opacity', 0.5 );
        d3.select( '#chart' ).call( chart );

    }

    function hide_price () {

        legend.item( 'AAPL', line );
        d3.select( '#chart' ).call( chart );

    }

});