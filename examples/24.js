var width = parseInt(d3.select('#chart').style('width'));
var margins = {top:50, right: 75, bottom: 50, left: 75};
var boxwidth = 50;
var boxheight = 50;
var boxpadding = 30;
var labelpadding = 20;

var chart = d3.chart()
    .width(width)
    .x_axis(d3.axisBottom())
    .y_axis(d3.axisLeft())
    .domain([0,100])
    .range([0,100]);

var legend = chart.legend()
    .margin(margins)
    .item('Item 1', 'steelblue')
    .item('Item 2', 'green')
    .item('Item 3', 'red')
    .box_padding(boxpadding)
    .box_width(boxwidth)
    .box_height(boxheight)
    .label_padding(labelpadding);


var chart_width = chart.width() - chart.margin().left - chart.margin().right;
var chart_height = chart.height() - chart.margin().top - chart.margin().bottom;

var spacing = chart( d3.select('#chart') )
    .insert('g', ':first-child')
    .style('font', '10px sans-serif')
    .style('font-weight', 'bold');
var defs = spacing.append('defs');

defs.append('marker')
    .attr('id', 'triangle-start')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 10)
    .attr('refY', 5)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 0 0 L 10 5 L 0 10 z');

defs.append('marker')
    .attr('id', 'triangle-end')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 10)
    .attr('refY', 5)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 0 0 L 10 5 L 0 10 z');

defs.append('marker')
    .attr('id', 'bar')
    .attr('viewBox', '0 0 3 6')
    .attr('refX', 1.5)
    .attr('refY', 3)
    .attr('markerWidth', 4)
    .attr('markerHeight', 6)
    .attr('markerUnits', 'strokeWidth')
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 1.5 0 V 6')
    .attr('stroke', '#000')
    .attr('shape-rendering', 'crispEdges');

spacing.append('rect')
       .attr('class', 'outer')
       .attr('width', chart_width )
       .attr('height', chart_height );

spacing.append('rect')
       .attr('class', 'inner')
       .attr('x', margins.left)
       .attr('y', margins.top)
       .attr('width', chart_width - margins.left - margins.right)
       .attr('height', chart_height - margins.top - margins.bottom);

// Margins
spacing.append('line')
       .attr('class', 'arrow')
       .attr('x1', chart_width / 2)
       .attr('x2', chart_width / 2)
       .attr('y2', margins.top)
       .attr('marker-end', 'url(#triangle-end)');

spacing.append('text')
       .text('margin.top')
       .attr('x', chart_width / 2 + 8 )
       .attr('y', margins.top / 2)
       .attr( 'dominant-baseline', 'central' );

spacing.append('line')
       .attr('class', 'arrow')
       .attr('x2', margins.left)
       .attr('y1', chart_height / 2)
       .attr('y2', chart_height / 2)
       .attr('marker-end', 'url(#triangle-end)');

spacing.append('text')
       .text('margin.left')
       .attr('x', margins.left / 2 )
       .attr('y', chart_height / 2 - 8)
       .attr('text-anchor', 'middle');

spacing.append('line')
       .attr('class', 'arrow')
       .attr('x1', chart_width)
       .attr('x2', chart_width - margins.right)
       .attr('y1', chart_height / 2)
       .attr('y2', chart_height / 2)
       .attr('marker-end', 'url(#triangle-end)');

spacing.append('text')
       .text('margin.right')
       .attr('x', chart_width - margins.right / 2 )
       .attr('y', chart_height / 2 - 8)
       .attr('text-anchor', 'middle');

spacing.append('line')
       .attr('class', 'arrow')
       .attr('x1', chart_width / 2)
       .attr('x2', chart_width / 2)
       .attr('y1', chart_height)
       .attr('y2', chart_height - margins.bottom)
       .attr('marker-end', 'url(#triangle-end)');

spacing.append('text')
       .text('margin.bottom')
       .attr('x', chart_width / 2 + 8)
       .attr('y', chart_height - margins.bottom / 2)
       .attr( 'dominant-baseline', 'central' );


// Boxes
spacing.append('line')
       .attr('class', 'arrow')
       .attr('x1', chart_width - margins.right - boxwidth + 1)
       .attr('x2', chart_width - margins.right + 1)
       .attr('y1', margins.top - 8)
       .attr('y2', margins.top - 8)
       .attr('marker-start', 'url(#bar)')
       .attr('marker-end', 'url(#bar)');

spacing.append('text')
       .text('box_width')
       .attr('x', chart_width - margins.right - boxwidth / 2)
       .attr('y', margins.top - 16)
       .attr('text-anchor', 'middle');

spacing.append('line')
       .attr('class', 'arrow')
       .attr('x1', chart_width - margins.right + 9)
       .attr('x2', chart_width - margins.right + 9)
       .attr('y1', margins.top + 1)
       .attr('y2', margins.top + boxheight)
       .attr('marker-start', 'url(#bar)')
       .attr('marker-end', 'url(#bar)');

spacing.append('text')
       .text('box_height')
       .attr('x', chart_width - margins.right + 17)
       .attr('y', margins.top + boxheight / 2)
       .attr( 'dominant-baseline', 'central' );


// Box Padding
spacing.append('line')
       .attr('class', 'arrow')
       .attr('x1', chart_width - margins.right - boxwidth - labelpadding - 50)
       .attr('x2', chart_width - margins.right - boxwidth - labelpadding - 50)
       .attr('y1', margins.top + 2*boxheight + boxpadding)
       .attr('y2', margins.top + 2*boxheight + 2*boxpadding)
       .attr('marker-start', 'url(#bar)')
       .attr('marker-end', 'url(#bar)');

spacing.append('line')
       .attr('stroke', '#000')
       .attr('stroke-width', '1.0px')
       .attr('stroke-dasharray', '3,4')
       .attr('shape-rendering', 'crispEdges')
       .attr('x1', chart_width - margins.right - boxwidth - labelpadding - 50)
       .attr('x2', chart_width - margins.right - boxwidth)
       .attr('y1', margins.top + 2*boxheight + boxpadding)
       .attr('y2', margins.top + 2*boxheight + boxpadding);

spacing.append('line')
       .attr('stroke', '#000')
       .attr('stroke-width', '1.0px')
       .attr('stroke-dasharray', '3,4')
       .attr('shape-rendering', 'crispEdges')
       .attr('x1', chart_width - margins.right - boxwidth - labelpadding - 50)
       .attr('x2', chart_width - margins.right - boxwidth)
       .attr('y1', margins.top + 2*boxheight + 2*boxpadding)
       .attr('y2', margins.top + 2*boxheight + 2*boxpadding);

spacing.append('text')
       .text('box_padding')
       .attr('x', chart_width - margins.right - boxwidth - labelpadding - 56)
       .attr('y', margins.top + 2*boxheight + 1.5*boxpadding)
       .attr('text-anchor', 'end')
       .attr( 'dominant-baseline', 'central' );

// Label Padding
spacing.append('line')
       .attr('class', 'arrow')
       .attr('x1', chart_width - margins.right - boxwidth - labelpadding)
       .attr('x2', chart_width - margins.right - boxwidth)
       .attr('y1', margins.top + 3*boxheight + 2*boxpadding + 30)
       .attr('y2', margins.top + 3*boxheight + 2*boxpadding + 30)
       .attr('marker-start', 'url(#bar)')
       .attr('marker-end', 'url(#bar)');

spacing.append('line')
       .attr('stroke', '#000')
       .attr('stroke-width', '1.0px')
       .attr('stroke-dasharray', '3,4')
       .attr('shape-rendering', 'crispEdges')
       .attr('x1', chart_width - margins.right - boxwidth - labelpadding)
       .attr('x2', chart_width - margins.right - boxwidth - labelpadding)
       .attr('y1', margins.top + 3*boxheight + 1.5*boxpadding)
       .attr('y2', margins.top + 3*boxheight + 2*boxpadding + 30);

spacing.append('line')
       .attr('stroke', '#000')
       .attr('stroke-width', '1.0px')
       .attr('stroke-dasharray', '3,4')
       .attr('shape-rendering', 'crispEdges')
       .attr('x1', chart_width - margins.right - boxwidth)
       .attr('x2', chart_width - margins.right - boxwidth)
       .attr('y1', margins.top + 3*boxheight + 2*boxpadding)
       .attr('y2', margins.top + 3*boxheight + 2*boxpadding + 30);

spacing.append('text')
       .text('label_padding')
       .attr('x', chart_width - margins.right - boxwidth - labelpadding / 2)
       .attr('y', margins.top + 3*boxheight + 2*boxpadding + 50)
       .attr('text-anchor', 'middle');

// Locations
spacing.append('text')
       .text('nw')
       .attr('x', margins.left + 15)
       .attr('y', margins.top + 25)
       .attr('dominant-baseline', 'central' );

spacing.append('text')
       .text('sw')
       .attr('x', margins.left + 15)
       .attr('y', chart_height - margins.bottom - 25)
       .attr('dominant-baseline', 'central' );

spacing.append('text')
       .text('se')
       .attr('x', chart_width - margins.right - 15)
       .attr('y', chart_height - margins.bottom - 25)
       .attr('text-anchor', 'end')
       .attr('dominant-baseline', 'central' );

// Origin
spacing.append('text')
       .text('origin')
       .attr('y', -8);

spacing.append('circle')
       .attr('r', 4.5);