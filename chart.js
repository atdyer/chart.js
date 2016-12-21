function chart () {

    // ID
    var id = _gen_id();

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
    var line = d3.line().x( _X ).y( _Y );
    var lines = [];

    // Scatters
    var scatters = [];

    // Colors
    var _current_color = 0;
    var _colors = ["#377eb8","#e41a1c","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#999999"];

    // Hover callbacks
    var mouse_in, mouse_move, mouse_out;


    // The charting function
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
                           .append( 'g' )
                           .merge( _lines );

            _lines.each( function ( _line ) {

                _line( d3.select( this ) );

            });

            // Add the mouse area
            var mouse_area = g.append( 'rect' )
                              .attr( 'width', width - margin.left - margin.right )
                              .attr( 'height', height - margin.top - margin.bottom )
                              .attr( 'stroke', 'none' )
                              .attr( 'fill', 'none' )
                              .attr( 'pointer-events', 'all' );

            mouse_area.on( 'mouseover', function () {

                lines.forEach( function ( line ) {
                    if ( line.hover() ) {
                        line.mouse_in();
                    }
                });

                if ( typeof mouse_in === 'function' ) {
                    mouse_in( id );
                }

            });

            mouse_area.on( 'mousemove', function () {

                var mouse = d3.mouse( this );
                var x = x_scale.invert( mouse[0] );
                lines.forEach( function ( line ) {

                    if ( line.hover() ) {
                        line.mouse_move( x );
                    }

                });

                if ( typeof mouse_move === 'function' ) {
                    mouse_move( id, x );
                }

            });

            mouse_area.on( 'mouseout', function () {

                lines.forEach( function ( line ) {
                    if ( line.hover() ) {
                        line.mouse_out();
                    }
                });

                if ( typeof mouse_out === 'function' ) {
                    mouse_out( id );
                }

            });

        });

    }


    // Plotting functions
    _chart.line = function ( id ) {

        var _id = id || _gen_id();
        var _color = _next_color();
        var _data = [];
        var _thickness = 1.0;
        var _path;

        // Hover stuff
        var _dot;
        var _hover = false;
        var _bisector = d3.bisector( function ( d ) { return x_value( d ); } ).left;


        function _line ( group ) {

            group.attr( 'id', _id );

            _path = group.selectAll( 'path' ).data( function ( d ) { return [d]; } );
            _dot = group.selectAll( 'circle' ).data( ['dot'] );

            _path = _path.enter()
                       .append( 'path' )
                       .attr( 'class', 'line' )
                       .merge( _path );

            _dot = _dot.enter()
                       .append( 'circle' )
                       .attr( 'r', 3 )
                       .attr( 'fill', _color )
                       .style( 'display', 'none' )
                       .merge( _dot );

            _path.attr( 'fill', 'none' )
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

        _line.hover = function ( _ ) {
            if ( !arguments.length ) return _hover;
            _hover = _;
            return _line;
        };

        _line.id = function () {
            return _id;
        };

        _line.mouse_in = function () {
            _dot.style( 'display', null );
        };

        _line.mouse_move = function ( x ) {

            var i = _bisector( _data, x );
            var d0 = _data[ i -1 ];
            var d1 = _data[ i ];
            var d = d0 && d1 ? x - x_value( d0 ) > x_value( d1 ) - x ? d1 : d0 :
                d0 ? d0 : d1;

            if ( d ) {
                _dot.attr( 'cx', _X( d ) )
                    .attr( 'cy', _Y( d ) );
            }

            if ( typeof _hover === 'function' ) {
                _hover({
                    id: _id,
                    x: x_value( d ),
                    y: y_value( d )
                });
            }

        };

        _line.mouse_out = function () {
            _dot.style( 'display', 'none' );
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


    // Chart API
    _chart.each = function ( _ ) {
        if ( typeof _ === 'function' ) {
            lines.forEach( _ );
            scatters.forEach( _ );
        }
    };

    _chart.height = function ( _ ) {
        if ( !arguments.length ) return height;
        height = _;
        return _chart;
    };

    _chart.hover = function ( _ ) {
        if ( !arguments.length ) return mouse_move;
        mouse_move = _;
        return _chart;
    };

    _chart.id = function () {
        return id;
    };

    _chart.margin = function ( _ ) {
        if ( !arguments.length ) return margin;
        margin = _;
        return _chart;
    };

    _chart.mouse_in = function ( _ ) {
        if ( !arguments.length ) return mouse_in;
        mouse_in = _;
        return _chart;
    };

    _chart.mouse_out = function ( _ ) {
        if ( !arguments.length ) return mouse_out;
        mouse_out = _;
        return _chart;
    };

    _chart.width = function ( _ ) {
        if ( !arguments.length ) return width;
        width = _;
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


    // Helper functions
    function _gen_id () {

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }
        return 'a' + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();

    }

    function _next_color () {

        if ( _current_color >= _colors.length ) _current_color = 0;
        return _colors[ _current_color++ ];

    }

    function _scale_domains () {

        var x_initial = lines.length ? d3.extent( lines[0].data(), x_value ) :
            scatters.length ? d3.extent( scatters[0].data(), x_value ) :
                [ 0, 1 ];
        var y_initial = lines.length ? d3.extent( lines[0].data(), y_value ) :
            scatters.length ? d3.extent( scatters[0].data(), y_value ) :
                [ 0, 1 ];

        x_scale.domain( x_initial );
        y_scale.domain( y_initial );

        lines.forEach( function ( line ) {

            var x_extent = d3.extent( line.data(), x_value );
            var y_extent = d3.extent( line.data(), y_value );

            x_scale.domain( d3.extent( x_scale.domain().concat( x_extent ) ) );
            y_scale.domain( d3.extent( y_scale.domain().concat( y_extent ) ) );

        });

    }

    function _X ( d ) {
        return x_scale( x_value( d ) );
    }

    function _Y ( d ) {
        return y_scale( y_value( d ) );
    }


    // Tools
    chart.linker = function () {

        var charts = {};

        function _linker () {}

        _linker.link = function ( chart ) {

            charts[ chart.id() ] = chart;

            chart.hover( _linker.hover )
                 .mouse_out( _linker.mouse_out )
                 .mouse_in( _linker.mouse_over );

        };

        _linker.unlink = function ( chart ) {

            delete charts[ chart.id() ];

            chart.hover( null )
                 .mouse_out( null )
                 .mouse_in( null );

        };

        _linker.hover = function ( id, x ) {

            for ( var key in charts ) {
                if ( key !== id && charts.hasOwnProperty( key ) ) {
                    charts[ key].each( function ( item ) {
                        if ( item.hover() ){
                            item.mouse_move( x );
                        }
                    });
                }
            }

        };

        _linker.mouse_out = function ( id ) {

            for ( var key in charts ) {
                if ( key !== id && charts.hasOwnProperty( key ) ) {
                    charts[ key ].each( function ( item ) {
                        if ( item.hover() ) {
                            item.mouse_out();
                        }
                    });
                }
            }

        };

        _linker.mouse_over = function ( id ) {

            for ( var key in charts ) {
                if ( key != id && charts.hasOwnProperty( key ) ) {
                    charts[ key ].each( function ( item ) {
                        if ( item.hover() ) {
                            item.mouse_in();
                        }
                    });
                }
            }

        };

        return _linker;

    };

    return _chart;

}