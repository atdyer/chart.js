(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.d3 = global.d3 || {})));
}(this, function (exports) { 'use strict';

    function chart() {

        // ID
        var id = _gen_id();

        // Chart options
        var outer_width = 760;
        var outer_height = 500;
        var margin = { top: 20, right: 20, bottom: 20, left: 30 };
        var width, height;

        // x-axis
        var x_value = function ( d ) {
            return d[ 0 ];
        };
        var x_scale;    // Defaults to d3.scaleLinear()
        var x_axis;     // Defaults to d3.axisBottom()
        var x_location; // Defaults to 'bottom'
        var x_grid;     // Defaults to none

        // y-axis
        var y_value = function ( d ) {
            return d[ 1 ];
        };
        var y_scale;    // Defaults to d3.scaleLinear()
        var y_axis;     // Defaults to d3.axisLeft()
        var y_location; // Defaults to 'left'
        var y_grid;     // Defaults to none

        // Domain and range
        var domain;
        var range;

        // Areas
        var areas = [];
        var area = d3.area()
            .x(_X)
            .y1(_Y);

        // Lines
        var lines = [];
        var line = d3.line()
            .x(_X)
            .y(_Y);

        // Scatters
        var scatters = [];

        // Colors
        var _current_color = 0;
        var _colors = [ "#377eb8", "#e41a1c", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999" ];

        // Hover callbacks
        var mouse_in, mouse_move, mouse_out;


        // The charting function
        function _chart( selection ) {

            width = outer_width - margin.left - margin.right;
            height = outer_height - margin.top - margin.bottom;

            selection.each(function () {

                var svg = d3.select(this)
                    .selectAll('svg')
                    .data([ 'chart.js' ]);

                // If it doesn't exist, create the chart group
                var enter = svg.enter()
                    .append('svg');
                var g = enter.append('g');

                // Add the axes
                g.append('g')
                    .attr('class', 'x axis');
                g.append('g')
                    .attr('class', 'y axis');
                g.append('g')
                    .attr('class', 'x axis minor');
                g.append('g')
                    .attr('class', 'y axis minor');

                // Update the outer dimensions
                svg = enter.merge(svg)
                    .attr('width', outer_width)
                    .attr('height', outer_height);

                // Update the inner dimensions
                g = svg.select('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                _build_scales();

                _build_axes( g );

                _update_group( g, 'areagroup', areas );
                _update_group( g, 'linegroup', lines );
                _update_group( g, 'scattergroup', scatters );

                _build_hover_area( g );

            });

            return selection.selectAll('svg > g');

        }


        // Plotting functions
        _chart.area = function ( id ) {

            var _id = id || _gen_id();
            var _data = [];
            var _path;
            var _attributes = d3.map();

            _attributes.set( 'fill', _next_color() );

            var _hover = false;
            var _line;
            var _bisector = d3.bisector(function ( d ) {
                return x_value(d);
            }).left;

            function _area( group ) {

                group.attr('id', _id);
                area.y0(height);

                _path = group.selectAll('path')
                    .data( function ( d ) {
                        return [ d ];
                    });

                _line = group.selectAll('.hoverline')
                            .data([ 'hoverline' ]);

                _path = _path.enter()
                    .append('path')
                    .attr('class', 'area')
                    .merge(_path);

                _line = _line.enter()
                           .append('line')
                           .attr('class', 'hoverline')
                           .style('display', 'none')
                           .merge(_line);

                _path.attr('d', function ( d ) {
                        return area(d.data());
                    });

                _attributes.each( function ( _value, _attr ) {
                    _path.attr(_attr, _value);
                });

                _line.style('stroke', d3.color(_attributes.get('fill')).darker())
                     .style('shape-rendering', 'crispEdges');

            }

            _area.attr = function ( _ ) {
                if ( arguments.length === 1 ) return _attributes.get( _ );
                if ( arguments.length === 2 ) {
                    _attributes.set( arguments[0], arguments[1] );
                    return _area;
                }
            };

            _area.data = function ( _ ) {
                if ( !arguments.length ) return _data;
                _data = _;
                return _area;
            };

            _area.hover = function ( _ ) {
                if ( !arguments.length ) return _hover;
                _hover = _;
                return _area;
            };

            _area.id = function ( _ ) {
                return _id;
            };

            _area.mouse_in = function () {
                _line.style('display', null);
            };

            _area.mouse_move = function ( x ) {

                var i = _bisector(_data, x);
                var d0 = _data[ i - 1 ];
                var d1 = _data[ i ];
                var d = d0 && d1 ? x - x_value(d0) > x_value(d1) - x ? d1 : d0 :
                    d0 ? d0 : d1;

                if ( d ) {
                    _line.attr('x1', _X(d))
                        .attr('x2', _X(d))
                        .attr('y1', y_scale.range()[0])
                        .attr('y2', _Y(d));
                }

                if ( typeof _hover === 'function' ) {
                    _hover({
                        id: _id,
                        x: x_value(d),
                        y: y_value(d)
                    });
                }

            };

            _area.mouse_out = function () {
                _line.style('display', 'none');
            };

            _area.remove = function () {

                var i = lines.indexOf(_area);
                if ( i != -1 ) {
                    lines.splice(i, 1);
                }

            };

            areas.push( _area );
            return _area;

        };

        _chart.line = function ( id ) {

            var _id = id || _gen_id();
            var _data = [];
            var _path;
            var _attributes = d3.map();

            // Defaults
            _attributes.set( 'stroke', _next_color() );
            _attributes.set( 'stroke-width', 1.0 );

            // Hover stuff
            var _dot;
            var _hover = false;
            var _bisector = d3.bisector(function ( d ) {
                return x_value(d);
            }).left;


            function _line( group ) {

                group.attr('id', _id);

                _path = group.selectAll('path')
                    .data(function ( d ) {
                        return [ d ];
                    });
                _dot = group.selectAll('.hoverdot')
                    .data([ 'hoverdot' ]);

                _path = _path.enter()
                    .append('path')
                    .attr('class', 'line')
                    .merge(_path);

                _dot = _dot.enter()
                    .append('circle')
                    .attr('class', 'hoverdot')
                    .style('display', 'none')
                    .merge(_dot);

                _path.attr('fill', 'none')
                    .attr('d', function ( d ) {
                        return line(d.data());
                    });

                _attributes.each( function ( _value, _attr ) {
                    _path.attr(_attr, _value);
                });

                _dot.attr('r', 3)
                    .attr('fill', _attributes.get('stroke'));

            }

            _line.attr = function ( _ ) {
                if ( arguments.length === 1 ) return _attributes.get( _ );
                if ( arguments.length === 2 ) {
                    _attributes.set( arguments[0], arguments[1] );
                    return _line;
                }
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
                _dot.style('display', null);
            };

            _line.mouse_move = function ( x ) {

                var i = _bisector(_data, x);
                var d0 = _data[ i - 1 ];
                var d1 = _data[ i ];
                var d = d0 && d1 ? x - x_value(d0) > x_value(d1) - x ? d1 : d0 :
                    d0 ? d0 : d1;

                if ( d ) {
                    _dot.attr('cx', _X(d))
                        .attr('cy', _Y(d));
                }

                if ( typeof _hover === 'function' ) {
                    _hover({
                        id: _id,
                        x: x_value(d),
                        y: y_value(d)
                    });
                }

            };

            _line.mouse_out = function () {
                _dot.style('display', 'none');
            };

            _line.remove = function () {

                var i = lines.indexOf(_line);
                if ( i != -1 ) {
                    lines.splice(i, 1);
                }

            };

            lines.push(_line);
            return _line;

        };

        _chart.scatter = function ( id ) {

            var _id = id || _gen_id();
            var _data = [];
            var _dots;
            var _attributes = d3.map();

            _attributes.set('fill', _next_color());
            _attributes.set('r', 1.0);

            // Hover stuff
            var _dot;
            var _hover = false;
            var _bisector = d3.bisector(function ( d ) {
                return x_value(d);
            }).left;

            function _scatter( group ) {

                group.attr('id', _id);

                _dots = group.selectAll('.dot')
                    .data(function ( d ) {
                        return d.data();
                    });
                _dot = group.selectAll('.hoverdot')
                    .data([ 'hoverdot' ]);

                _dots = _dots.enter()
                    .append('circle')
                    .attr('class', 'dot')
                    .merge(_dots);

                _dot = _dot.enter()
                    .append('circle')
                    .attr('class', 'hoverdot')
                    .style('display', 'none')
                    .merge(_dot);

                _dots
                    .attr('cx', function ( d ) {
                        return _X(d);
                    })
                    .attr('cy', function ( d ) {
                        return _Y(d);
                    });

                _attributes.each( function ( _value, _attr) {
                    _dots.attr(_attr, _value);
                });

                _dot.attr('fill', _attributes.get('fill'));

            }

            _scatter.attr = function ( _ ) {
                if ( arguments.length === 1 ) return _attributes.get( _ );
                if ( arguments.length === 2 ) {
                    _attributes.set( arguments[0], arguments[1] );
                    return _scatter;
                }
            };

            _scatter.data = function ( _ ) {
                if ( !arguments.length ) return _data;
                _data = _;
                return _scatter;
            };

            _scatter.hover = function ( _ ) {
                if ( !arguments.length ) return _hover;
                _hover = _;
                return _scatter;
            };

            _scatter.id = function () {
                return _id;
            };

            _scatter.mouse_in = function () {
                _dot.style('display', null);
            };

            _scatter.mouse_move = function ( x ) {

                var i = _bisector(_data, x);
                var d0 = _data[ i - 1 ];
                var d1 = _data[ i ];
                var d = d0 && d1 ? x - x_value(d0) > x_value(d1) - x ? d1 : d0 :
                    d0 ? d0 : d1;

                if ( d ) {
                    _dot.attr('cx', _X(d))
                        .attr('cy', _Y(d));

                    var radius = _attributes.get('r');
                    if ( typeof radius === 'function' ) {
                        radius = radius(d) + 2;
                    } else {
                        radius = radius + 2;
                    }

                    _dot.attr('r', radius);
                }

                if ( typeof _hover === 'function' ) {
                    _hover({
                        id: _id,
                        x: x_value(d),
                        y: y_value(d)
                    });
                }

            };

            _scatter.mouse_out = function () {
                _dot.style('display', 'none');
            };

            _scatter.remove = function () {

                var i = scatters.indexOf(_line);
                if ( i != -1 ) {
                    scatters.splice(i, 1);
                }

            };

            scatters.push(_scatter);
            return _scatter;

        };


        // Chart API
        _chart.domain = function ( _ ) {
            if ( !arguments.length ) return domain;
            domain = _;
            return _chart;
        };

        _chart.each = function ( _ ) {
            if ( typeof _ === 'function' ) {
                areas.forEach(_);
                lines.forEach(_);
                scatters.forEach(_);
            }
        };

        _chart.height = function ( _ ) {
            if ( !arguments.length ) return outer_height;
            outer_height = _;
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
            margin.top = _.top === 0 ? 0 : ( _.top || margin.top );
            margin.right = _.right === 0 ? 0 : _.right || margin.right;
            margin.bottom = _.bottom === 0 ? 0 : _.bottom || margin.bottom;
            margin.left = _.left === 0 ? 0 : _.left || margin.left;
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

        _chart.range = function ( _ ) {
            if ( !arguments.length ) return range;
            range = _;
            return _chart;
        };

        _chart.width = function ( _ ) {
            if ( !arguments.length ) return outer_width;
            outer_width = _;
            return _chart;
        };

        _chart.x = function ( _ ) {
            if ( !arguments.length ) return x_value;
            x_value = _;
            return _chart;
        };

        _chart.x_axis = function ( _ ) {
            if ( !arguments.length ) return x_axis;
            x_axis = _;
            return _chart;
        };

        _chart.x_grid = function ( _ ) {
            if ( !arguments.length ) return x_grid;
            x_grid = _;
            return _chart;
        };

        _chart.x_location = function ( _ ) {
            if ( !arguments.length ) return x_location;
            x_location = _;
            return _chart;
        };

        _chart.x_scale = function ( _ ) {
            if ( !arguments.length ) return x_scale;
            x_scale = _;
            return _chart;
        };

        _chart.y = function ( _ ) {
            if ( !arguments.length ) return y_value;
            y_value = _;
            return _chart;
        };

        _chart.y_axis = function ( _ ) {
            if ( !arguments.length ) return y_axis;
            y_axis = _;
            return _chart;
        };

        _chart.y_grid = function ( _ ) {
            if ( !arguments.length ) return y_grid;
            y_grid = _;
            return _chart;
        };

        _chart.y_location = function ( _ ) {
            if ( !arguments.length ) return y_location;
            y_location = _;
            return _chart;
        };

        _chart.y_scale = function ( _ ) {
            if ( !arguments.length ) return y_scale;
            y_scale = _;
            return _chart;
        };


        // Helper functions
        function _build_axes( g ) {

            if ( x_axis ) {
                x_axis.scale( x_scale );
                g.select('.x.axis')
                    .attr('transform', 'translate(0,' + _calculate_x_axis_location( x_location ) + ')')
                    .style('shape-rendering', 'crispEdges')
                    .call(x_axis);

            }
            if ( y_axis ) {
                y_axis.scale( y_scale );
                g.select('.y.axis')
                    .attr('transform', 'translate(' + _calculate_y_axis_location( y_location ) + ',0)')
                    .style('shape-rendering', 'crispEdges')
                    .call(y_axis);
            }

            if ( x_grid && typeof x_grid == "boolean" ) x_grid = '2,2';
            if ( y_grid && typeof y_grid == "boolean" ) y_grid = '2,2';

            if ( x_grid ) {

                var _x_minor = g.select('.x.axis.minor')
                    .attr('transform', 'translate(0,' + y_scale.range()[ 0 ] + ')')
                    .style('shape-rendering', 'crispEdges')
                    .call(
                        d3.axisBottom(x_scale).tickSizeInner(-height)
                    );

                _x_minor.selectAll('text')
                    .style('display', 'none');

                _x_minor.selectAll('.domain')
                    .style('display', 'none');

                _x_minor.selectAll('line')
                    .style('stroke', '#777')
                    .style('stroke-opacity', 0.35)
                    .style('stroke-dasharray', x_grid);

            }

            if ( y_grid ) {

                var _y_minor = g.select('.y.axis.minor')
                    .style('shape-rendering', 'crispEdges')
                    .call(
                        d3.axisLeft(y_scale).tickSizeInner(-width)
                    );

                _y_minor.selectAll('text')
                    .style('display', 'none');

                _y_minor.selectAll('.domain')
                    .style('display', 'none');

                _y_minor.selectAll('line')
                    .style('stroke', '#777')
                    .style('stroke-opacity', 0.35)
                    .style('stroke-dasharray', y_grid);

            }

        }

        function _build_hover_area( g ) {

            var mouse_area = g.selectAll('#m' + id)
                              .data([ 'mousearea' ]);

            mouse_area.exit()
                      .remove();

            mouse_area = mouse_area.enter()
                                   .append('rect')
                                   .attr('id', 'm' + id)
                                   .merge(mouse_area)
                                   .attr('width', width)
                                   .attr('height', height)
                                   .attr('stroke', 'none')
                                   .attr('fill', 'none')
                                   .attr('pointer-events', 'all');

            var data = [].concat( areas, lines, scatters );

            mouse_area.on('mouseover touchstart', function () {

                data.forEach(function ( d ) {
                    if ( d.hover() ) {
                        d.mouse_in();
                    }
                });

                if ( typeof mouse_in === 'function' ) {
                    mouse_in(id);
                }

            });

            mouse_area.on('mousemove touchmove', function () {

                var mouse = d3.mouse(this);
                var x = x_scale.invert(mouse[ 0 ]);

                data.forEach(function ( d ) {
                    if ( d.hover() ) {
                        d.mouse_move(x);
                    }
                });

                if ( typeof mouse_move === 'function' ) {
                    mouse_move(id, x);
                }

            });

            mouse_area.on('mouseout touchend touchcancel', function () {

                data.forEach(function ( d ) {
                    if ( d.hover() ) {
                        d.mouse_out();
                    }
                });

                if ( typeof mouse_out === 'function' ) {
                    mouse_out(id);
                }

            });

        }

        function _build_scales() {

            x_scale = x_scale || d3.scaleLinear();
            y_scale = y_scale || d3.scaleLinear();

            // Update the scales to fit the plotting area
            x_scale.range([ 0, width ]);
            y_scale.range([ height, 0 ]);

            var data = [].concat( areas, lines, scatters );

            // Update domains
            if ( domain ) {
                x_scale.domain( domain );
            } else {

                var xmin = d3.min( data, function ( d ) { return d3.min( d.data(), x_value ); } );
                var xmax = d3.max( data, function ( d ) { return d3.max( d.data(), x_value ); } );

                x_scale.domain([ xmin, xmax ]);
            }

            if ( range ) {
                y_scale.domain( range );
            } else {

                var ymin = d3.min( data, function ( d ) { return d3.min( d.data(), y_value ) } );
                var ymax = d3.max( data, function ( d ) { return d3.max( d.data(), y_value ) } );

                y_scale.domain([ ymin, ymax ]);

            }

        }

        function _calculate_x_axis_location( value ) {

            if ( value === 'top' ) {
                return y_scale.range()[ 1 ];
            }

            if ( typeof value === 'string' ) {
                if ( value.slice(-1) === '%' ) {
                    var percent = parseFloat( value ) / 100.0;
                    return d3.interpolateNumber( y_scale.range()[0], y_scale.range()[1] )( percent );
                }
                if ( value.slice(-2) === 'px' ) {
                    return parseFloat( value );
                }
            }

            if ( y_scale( value ) ) return y_scale( value );

            return y_scale.range()[ 0 ];

        }

        function _calculate_y_axis_location( value ) {

            if ( value === 'right' ) {
                return x_scale.range()[ 1 ];
            }

            if ( typeof value === 'string' ) {
                if ( value.slice(-1) === '%' ) {
                    var percent = parseFloat( value ) / 100.0;
                    return d3.interpolateNumber( x_scale.range()[0], x_scale.range()[1] )( percent );
                }
                if ( value.slice(-2) === 'px' ) {
                    return parseFloat( value );
                }
            }

            if ( x_scale( value ) ) return x_scale( value );

            return x_scale.range()[0];

        }

        function _gen_id() {

            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return 'a' + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();

        }

        function _next_color() {

            if ( _current_color >= _colors.length ) _current_color = 0;
            return _colors[ _current_color++ ];

        }

        function _update_group( g, c, d ) {

            var _selection = g.selectAll('g')
                          .filter('.' + c)
                          .data(d, function ( item ) {
                              return item.id();
                          });

            _selection.exit()
                  .remove();

            _selection.enter()
                  .append('g')
                  .attr('class', c)
                  .merge(_selection)
                  .each(function ( _item ) {

                      _item(d3.select(this));

                  });

        }

        function _X( d ) {
            return x_scale(x_value(d));
        }

        function _Y( d ) {
            return y_scale(y_value(d));
        }

        return _chart;

    }

    // Tools
    chart.linker = function () {

        var charts = {};

        function _linker() {
        }

        _linker.link = function ( chart ) {

            charts[ chart.id() ] = chart;

            chart.hover(_linker.hover)
                 .mouse_out(_linker.mouse_out)
                 .mouse_in(_linker.mouse_over);

            return _linker;

        };

        _linker.unlink = function ( chart ) {

            delete charts[ chart.id() ];

            chart.hover(null)
                 .mouse_out(null)
                 .mouse_in(null);

            return _linker;

        };

        _linker.hover = function ( id, x ) {

            for ( var key in charts ) {
                if ( key !== id && charts.hasOwnProperty(key) ) {
                    charts[ key ].each(function ( item ) {
                        if ( item.hover() ) {
                            item.mouse_move(x);
                        }
                    });
                }
            }

        };

        _linker.mouse_out = function ( id ) {

            for ( var key in charts ) {
                if ( key !== id && charts.hasOwnProperty(key) ) {
                    charts[ key ].each(function ( item ) {
                        if ( item.hover() ) {
                            item.mouse_out();
                        }
                    });
                }
            }

        };

        _linker.mouse_over = function ( id ) {

            for ( var key in charts ) {
                if ( key != id && charts.hasOwnProperty(key) ) {
                    charts[ key ].each(function ( item ) {
                        if ( item.hover() ) {
                            item.mouse_in();
                        }
                    });
                }
            }

        };

        return _linker;

    };

    exports.chart = chart;

    Object.defineProperty(exports, '__esModule', { value: true });

}));