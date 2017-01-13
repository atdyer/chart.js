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

    var area = chart.area()
        .data( data )
        .hover( show_price )
        .hover_out( hide_price );

    var legend = chart.legend()
        .location( 'nw' )
        .item( 'AAPL', area );

    d3.select( '#chart' )
        .call( chart );

    function show_price ( d ) {

        var date = formatTime(d.date);
        var price = '$' + d.price.toFixed(2);

        legend.item( date + ': ' + price, area );

        d3.select( this )
            .attr( 'stroke', 'black' )
            .attr( 'stroke-width', 1 )
            .attr( 'stroke-dasharray', '4,2' );

        d3.select( '#chart' ).call( chart );

    }

    function hide_price () {

        legend.item( 'AAPL', area );
        d3.select( '#chart' ).call( chart );

    }

});