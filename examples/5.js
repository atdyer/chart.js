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

    var l1 = c1.line()
               .data( cities[0].values )
               .hover( true );

    var l2 = c2.line()
               .data( cities[1].values )
               .color( "#e41a1c" )
               .hover( true );

    var l3 = c3.line()
               .data( cities[2].values )
               .color( "#4daf4a" )
               .hover( true );

    var link = linker();
    link.link( l1 );
    link.link( l2 );
    link.link( l3 );

    d3.select( '#chart1' ).call( c1 );
    d3.select( '#chart2' ).call( c2 );
    d3.select( '#chart3' ).call( c3 );

});

function type(d, _, columns) {
    d.date = parseTime(d.date);
    for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
    return d;
}

function linker () {

    var items = {

    };

    var hoverstates = {

    };

    function _linker () {}

    _linker.link = function ( item ) {

        items[ item.id() ] = item;
        hoverstates[ item.id() ] = item.hover();

        item.hover( _linker.hover );
        item.hover_hide( _linker.hover_hide );
        item.hover_show( _linker.hover_show );

    };

    _linker.unlink = function ( item ) {

        item.hover( hoverstates[ item.id ] );
        item.hover_hide( null );
        item.hover_show( null );
        delete items[ item.id() ];
        delete hoverstates[ item.id() ];

    };

    _linker.hover = function ( d ) {


    };

    _linker.hover_hide = function ( id ) {

        console.log( 'ID: ' + id );

        for ( var key in items ) {
            if ( key !== id && items.hasOwnProperty( key ) ) {
                console.log( key );
                // items[ key ].hover_hide();
            }
        }

    };

    _linker.hover_show = function ( id ) {

        // for ( var key in items ) {
        //     if ( key != id && items.hasOwnProperty( key ) ) {
        //         items[ key ].hover_show();
        //     }
        // }

    };

    return _linker;

}