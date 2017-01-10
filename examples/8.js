var parseDate = d3.timeParse('%b %Y');
var linker = d3.chart.linker();

d3.tsv('data/stocks.tsv', type, function ( error, data ) {

    if ( error ) throw error;

    var symbols = d3.nest()
        .key(function ( d ) {
            return d.symbol;
        })
        .entries(data);

    var domain = [
        d3.min(symbols, function ( symbol ) {
            return symbol.values[ 0 ].date;
        }),
        d3.max(symbols, function ( symbol ) {
            return symbol.values[ symbol.values.length - 1 ].date;
        })
    ];

    var width = parseInt(d3.select('#chart').style('width'));

    d3.select('#chart')
        .selectAll('div')
        .data(symbols)
        .enter()
        .append('div')
        .each(function ( d ) {

            var range = [ 0, d3.max(d.values, function(d) { return d.price; }) ];

            var chart = d3.chart()
                .width(width)
                .height(69)
                .margin({top: 8, right: 10, bottom: 2, left: 10})
                .domain(domain)
                .range(range)
                .x_scale(d3.scaleTime())
                .x_label(d.key)
                .x(function ( d ) { return d.date; })
                .y(function ( d ) { return d.price; });

            chart.area()
                .data(d.values)
                .y0(0)
                .attr('fill', '#e7e7e7');

            chart.line()
                .data(d.values)
                .attr('stroke-width', 1.5)
                .attr('stroke', '#666')
                .hover(true);

            linker.link(chart);

            d3.select(this).call(chart);

        });
});

function type( d ) {
    d.price = +d.price;
    d.date = parseDate(d.date);
    return d;
}