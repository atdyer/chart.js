function chart () {

    // Chart options
    var width = 760;
    var height = 500;
    var margin = { top: 20, right: 20, bottom: 20, left: 30 };

    // x-axis
    var x_value = function ( d ) { return d[0]; };
    var x_scale = d3.scaleLinear();
    var x_axis = d3.axisBottom( x_scale );
    var x_label = '';

    // y-axis
    var y_value = function ( d ) { return d[1]; };
    var y_scale = d3.scaleLinear();
    var y_axis = d3.axisLeft( y_scale );
    var y_label = '';

    // Lines
    var line = d3.line().x( X ).y( Y );


    function _line ( selection ) {

        selection.each( function ( data ) {

            console.log( data );

        });

    }


    function _chart ( selection ) {

        selection.each( function ( data ) {

            console.log( data );

            var svg = d3.select( this ).selectAll( 'svg' ).data( [data] );

            // If it doesn't exist, create the chart group
            var enter = svg.enter().append( 'svg' );
            var g = enter.append( 'g' );

            // Add the axes
            g.append( 'g' ).attr( 'class', 'x axis' );
            g.append( 'g' ).attr( 'class', 'y axis' );

            // Update the outer dimensions
            svg = enter
                .merge( svg )
                .attr( 'width', width )
                .attr( 'height', height );

            // Update the inner dimensions
            g = svg
                .select( 'g' )
                .attr( 'transform', 'translate(' + margin.left + ',' + margin.top + ')' );


            // Update the lines
            var lines = g.selectAll( 'lines' ).data( [data.lines] );

            lines = lines.enter()
                         .append( 'g' )
                         .merge( lines )
                         .call( _line );

            lines.exit().remove();


            // Update the x-scale
            x_scale
                .domain( [ 0, 1 ] )
                .range( [ 0, width - margin.left - margin.right ] );

            // Update the y-scale
            y_scale
                .domain( [ 0, 1 ] )
                .range( [ height - margin.top - margin.bottom, 0 ] );

            // Update the x-axis
            g.select( '.x.axis' )
             .attr( 'transform', 'translate(0,' + y_scale.range()[0] + ')' )
             .call( x_axis );

            // Update the y-axis
            g.select( '.y.axis' )
             .call( y_axis );

        });

    }


    function X ( d ) {
        return x_scale( d[0] );
    }

    function Y ( d ) {
        return y_scale( d[1] );
    }


    // Getter/setter functions
    _chart.margin = function ( _ ) {
        if ( !arguments.length ) return margin;
        margin = _;
        return _chart;
    };

    _chart.width = function ( _ ) {
        if ( !arguments.length ) return width;
        width = _;
        return _chart;
    };

    _chart.height = function ( _ ) {
        if ( !arguments.length ) return height;
        height = _;
        return _chart;
    };

    _chart.x = function ( _ ) {
        if ( !arguments.length ) return x_value;
        x_value = _;
        return _chart;
    };

    _chart.y = function ( _ ) {
        if ( !arguments.length ) return y_value;
        y_value = _;
        return _chart;
    };


    return _chart;

}