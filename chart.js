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
    var lines = [];

    // Scatters
    var scatters = [];

    // Colors
    var _current_color = 0;
    var _colors = ["#377eb8","#e41a1c","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"];

    function _chart ( selection ) {

        selection.each( function () {

            var svg = d3.select( this ).selectAll( 'svg' ).data( ['chart.js'] );

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

            // Update the scales to fit the plotting area
            x_scale.range( [ 0, width - margin.left - margin.right ] );
            y_scale.range( [ height - margin.top - margin.bottom, 0 ] );

            // Update the domains to fit the data
            _scale_domains();

            // Update the x-axis
            g.select( '.x.axis' )
             .attr( 'transform', 'translate(0,' + y_scale.range()[0] + ')' )
             .style( 'shape-rendering', 'crispEdges' )
             .call( x_axis );

            // Update the y-axis
            g.select( '.y.axis' )
             .style( 'shape-rendering', 'crispEdges' )
             .call( y_axis );

            // Update lines
            var _lines = g.selectAll( '.line' ).data( lines, function ( l ) { return l.id(); } );

            _lines = _lines.enter()
                           .append( 'path' )
                           .attr( 'class', 'line' )
                           .merge( _lines );

            _lines.each( function ( _line ) {

                _line( this );

            });

        });

    }


    // Plotting functions
    _chart.line = function ( id ) {

        var _id = id || _gen_id();
        var _color = _next_color();
        var _data = [];
        var _thickness = 1.0;

        function _line ( path ) {

            path = d3.select( path );
            path.attr( 'id', _id )
                .attr( 'fill', 'none' )
                .attr( 'stroke', _color )
                .attr( 'stroke-width', _thickness )
                .attr( 'd', function ( d ) { return line( d.data() ); } );

        }

        _line.color = function ( _ ) {
            if ( !arguments.length ) return _color;
            _color = _;
            return _line;
        };

        _line.data = function ( _ ) {
            if ( !arguments.length ) return _data;
            _data = _;
            return _line;
        };

        _line.id = function () {
            return _id;
        };

        _line.remove = function () {

            var i = lines.indexOf( _line );
            if ( i != -1 ) {
                lines.splice( i, 1 );
            }

        };

        _line.thickness = function ( _ ) {
            if ( !arguments.length ) return _thickness;
            _thickness = _;
            return _line;
        };

        lines.push( _line );
        return _line;

    };


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

    _chart.x_scale = function ( _ ) {
        if ( !arguments.length ) return x_scale;
        x_scale = _;
        x_axis = d3.axisBottom( x_scale );
        return _chart;
    };

    _chart.y = function ( _ ) {
        if ( !arguments.length ) return y_value;
        y_value = _;
        return _chart;
    };

    _chart.y_scale = function ( _ ) {
        if ( !arguments.length ) return y_scale;
        y_scale = _;
        y_axis = d3.axisLeft( y_scale );
        return _chart;
    };


    function X ( d ) {
        return x_scale( d[0] );
    }

    function Y ( d ) {
        return y_scale( d[1] );
    }

    function _scale_domains () {

        // Set an initial domain
        var x_initial = lines.length ? d3.extent( lines[0].data(), x_value ) :
                        scatters.length ? d3.extent( scatters[0].data(), x_value ) :
                        [ 0, 1 ];
        var y_initial = lines.length ? d3.extent( lines[0].data(), y_value ) :
                        scatters.length ? d3.extent( scatters[0].data(), y_value ) :
                        [ 0, 1 ];

        x_scale.domain( x_initial );
        y_scale.domain( y_initial );

        // Expand domains to fit lines
        lines.forEach( function ( line ) {

            var x_extent = d3.extent( line.data(), function ( d ) { return d[0]; } );
            var y_extent = d3.extent( line.data(), function ( d ) { return d[1]; } );

            x_scale.domain( d3.extent( x_scale.domain().concat( x_extent ) ) );
            y_scale.domain( d3.extent( y_scale.domain().concat( y_extent ) ) );

        });

    }

    function _next_color () {
        if ( _current_color >= _colors.length ) _current_color = 0;
        return _colors[ _current_color++ ];
    }

    function _gen_id () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }
        return 'a' + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    return _chart;

}