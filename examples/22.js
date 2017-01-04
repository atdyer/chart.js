var parseDate = d3.timeParse("%b %Y");
var width = parseInt(d3.select('#chart').style('width'));

var add_data = d3.select('#add');
var remove_data = d3.select('#remove');
var legend_location = d3.select('#location');
var box_width = d3.select('#width');
var box_height = d3.select('#height');
var box_padding = d3.select('#padding-color');
var margin_top = d3.select('#margin-top');
var margin_right = d3.select('#right');
var margin_bottom = d3.select('#bottom');
var margin_left = d3.select('#left');
var label_padding = d3.select('#padding-label');
var label_font = d3.select('#font');

d3.tsv("data/stocks.tsv", type, function ( error, data ) {

    if ( error ) throw error;

    var symbols = d3.nest()
                    .key(key)
                    .entries(data);

    var chart = d3.chart()
        .width(width)
        .x_axis(d3.axisBottom())
        .y_axis(d3.axisLeft())
        .x_scale(d3.scaleTime())
        .y_scale(d3.scaleLog())
        .x( function ( d ) { return d.date; } )
        .y( function ( d ) { return d.price; } )
        .margin({left: 40});

    var legend = chart.legend();

    box_width.attr( 'value', legend.box_width() );
    box_height.attr( 'value', legend.box_height() );
    box_padding.attr( 'value', legend.box_padding() );
    margin_top.attr( 'value', legend.margin().top );
    margin_right.attr( 'value', legend.margin().right );
    margin_bottom.attr( 'value', legend.margin().bottom );
    margin_left.attr( 'value', legend.margin().left );
    label_padding.attr( 'value', legend.label_padding() );
    label_font.attr( 'value', legend.attr('font-size') );

    add_data.on( 'click', _add_data );
    remove_data.on( 'click', _remove_data );

    legend_location.on( 'change', function () { legend.location( legend_location.property( 'value' ) ); draw(); });
    box_width.on( 'input', function () { legend.box_width( +this.value ); draw(); });
    box_height.on( 'input', function () { legend.box_height( +this.value ); draw(); });
    box_padding.on( 'input', function () { legend.box_padding( +this.value ); draw(); });
    margin_top.on( 'input', function () { legend.margin( {top: +this.value} ); draw(); });
    margin_right.on( 'input', function () { legend.margin( {right: +this.value} ); draw(); });
    margin_bottom.on( 'input', function () { legend.margin( {bottom: +this.value} ); draw(); });
    margin_left.on( 'input', function () { legend.margin( {left: +this.value} ); draw(); });
    label_padding.on( 'input', function () { legend.label_padding( +this.value ); draw(); });
    label_font.on( 'input', function () { legend.attr('font-size', +this.value ); draw(); });

    var num_entries = symbols.length;
    var current_entry = 0;
    var lines = [];

    function _add_data () {

        var symbol = symbols[current_entry];
        var line = chart.line()
            .data( symbol.values )
            .attr( 'stroke-width', 1.5 );

        legend.item( symbol.key, line );

        lines.push( line );
        add_data.classed( 'inactive', lines.length == num_entries );
        remove_data.classed( 'inactive', lines.length == 0 );

        current_entry = current_entry == num_entries-1 ? 0 : current_entry + 1;

        draw();

    }

    function _remove_data () {

        var line = lines.shift();

        line.remove();
        legend.remove( line );

        add_data.classed( 'inactive', lines.length == num_entries );
        remove_data.classed( 'inactive', lines.length == 0 );

        draw();

    }

    function draw () {
        d3.select('#chart')
          .call(chart);
    }

    _add_data();
    draw();

});

function type( d ) {
    d.price = +d.price;
    d.date = parseDate(d.date);
    return d;
}

function key ( d ) {
    return d.symbol;
}