var parseDate = d3.timeParse("%b %Y");

var width = d3.select('body')
    .node()
    .getBoundingClientRect().width;

chart();
var linker = chart.linker();

d3.tsv("data/stocks.tsv", type, function ( error, data ) {

    if ( error ) throw error;

    var symbols = d3.nest()
        .key(function ( d ) {
            return d.symbol;
        })
        .entries(data);

    d3.select("#chart")
        .selectAll("div")
        .data(symbols)
        .enter()
        .append("div")
        .each( function ( d ) {

            var c = chart()
                .x( function ( d ) { return d.date; } )
                .y( function ( d ) { return d.price; } )
                .x_scale(d3.scaleTime())
                .width( width )
                .height( 150 )
                .margin( {left: 40} );

            c.line()
                .data( d.values )
                .hover( true );

            linker.link( c );

            c( d3.select( this ) );

        });
});

function type( d ) {
    d.price = +d.price;
    d.date = parseDate(d.date);
    return d;
}