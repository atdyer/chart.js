# d3-chart API

d3-chart is a small, hackable, d3-esque charting library. It is designed to be used in concert with D3 4.0. It began as an extension to the time-series-chart.js example from Mike Bostock's post on [reusable charts](https://bost.ocks.org/mike/chart/). As I was building charts for various projects, I often found myself starting with that code and adding functionality or hacking away at it to fit my needs, so I decided to start building my own version that would accumulate these new features. My hope is that this plugin will provide enough functionality to get charts 90% of the way there, and that the documentation and examples will be good enough that the last 10% is easily obtainable by making simple changes to the code as needed.

* [Charts](#charts) - Creating and drawing a chart
* [Areas](#areas) - Plotting of areas
* [Lines](#lines) - Plotting of lines
* [Scatters](#scatters) - Plotting of scatters
* [Legends](#legends) - Customizable legends
* [Tools](#tools) - Useful tools that work with charts

## Charts

Charts are created using the d3-chart plugin by calling the <a href="#d3-chart">d3.chart()</a> method. This method returns a configurable function, as described in Mike Bostock's post on [reusable charts](https://bost.ocks.org/mike/chart/). The chart is then configured using getter-setter methods provided by the configurable function. For example:

```javascript
var chart = d3.chart()
    .width(640)
    .height(400);
```

This creates a chart with a width of 640 pixels and a height of 400 pixels. Well...sort of. It's not actually creating anything visible on the screen. What it's actually creating is a function that knows *how* to draw a chart with a width of 640 pixels and a height of 400 pixels.

So now that we've got a function that knows *how* to draw the chart we want, we need to tell it *where* to draw the chart. This is done by calling the function we've created on a d3 selection.

```javascript
var chart = d3.chart()
    .width(640)
    .height(400);

d3.select('#chart')
    .call(chart);
```

This will draw the chart we've configured in the element with ID `chart`. It's important to understand that the chart will only ever be drawn when the configurable function is called. For example, if you were to tack on a `chart.width(400)` to the end of this code, the width of the chart that we've just drawn would not change unless you also included another call to `chart`. An example of a typical update pattern can be found in the [Resizing a Chart](https://atdyer.github.io/d3-chart/examples/6.html) example.

Plottables (i.e. lines, scatters, areas, etc.) are added to the chart as part of the configuration, so updates to the data will also need to be followed by a call to the configurable chart function. Documentation on how to add an configure plottables can be found in their sections of the API documentation.

### Chart API

<a name="d3-chart" href="#d3-chart">#</a> *d3*.**chart()**

<a name="chart-domain" href="#chart-domain">#</a> *chart*.**domain**()

<a name="chart-each" href="#chart-each">#</a> *chart*.**each**()

<a name="chart-height" href="#chart-height">#</a> *chart*.**height**([*h*])

Returns the outer height of the chart. Internally, the height is maintained according to the [margin convention](http://bl.ocks.org/mbostock/3019563), but the height value returned here will include the top and bottom margins. If *h* is specified, sets the external height of the chart.

<a name="chart-hover" href="#chart-hover">#</a> *chart*.**hover**()

<a name="chart-id" href="#chart-id">#</a> *chart*.**id**()

<a name="chart-margin" href="#chart-margin">#</a> *chart*.**margin**()

<a name="chart-mouse_in" href="#chart-mouse_in">#</a> *chart*.**mouse_in**()

<a name="chart-mouse_out" href="#chart-mouse_out">#</a> *chart*.**mouse_out**()

<a name="chart-range" href="#chart-range">#</a> *chart*.**range**()

<a name="chart-width" href="#chart-width">#</a> *chart*.**width**([*w*])

Returns the outer width of the chart. Internally, the width is maintained according to the [margin convention](http://bl.ocks.org/mbostock/3019563), but the width value returned here will include the left and right margins. If *w* is specified, sets the external width of the chart.

<a name="chart-x" href="#chart-x">#</a> *chart*.**x**()

<a name="chart-x_axis" href="#chart-x_axis">#</a> *chart*.**x_axis**()

<a name="chart-x_grid" href="#chart-x_grid">#</a> *chart*.**x_grid**()

<a name="chart-x_label" href="#chart-x_label">#</a> *chart*.**x_label**()

<a name="chart-x_location" href="#chart-x_location">#</a> *chart*.**x_location**([*location*])

<a name="chart-x_scale" href="#chart-x_scale">#</a> *chart*.**x_scale**()

<a name="chart-y" href="#chart-y">#</a> *chart*.**y**()

<a name="chart-y_axis" href="#chart-y_axis">#</a> *chart*.**y_axis**()

<a name="chart-y_grid" href="#chart-y_grid">#</a> *chart*.**y_grid**()

<a name="chart-y_label" href="#chart-y_label">#</a> *chart*.**y_label**()

<a name="chart-y_location" href="#chart-y_location">#</a> *chart*.**y_location**([*location*])

<a name="chart-y_scale" href="#chart-y_location">#</a> *chart*.**y_scale**()

## Areas

<a name="chart-area" href="#chart-area">#</a> *chart*.**area**()

<a name="area-attr" href="#area-attr">#</a> *area*.**attr**(*name*[, *value*])

<a name="area-curve" href="#area-curve">#</a> *area*.**curve**()

<a name="area-data" href="#area-data">#</a> *area*.**data**([*data*])

<a name="area-hover" href="#area-hover">#</a> *area*.**hover**()

<a name="area-id" href="#area-id">#</a> *area*.**id**()

<a name="area-mouse_in" href="#area-mouse_in">#</a> *area*.**mouse_in**()

<a name="area-mouse_move" href="#area-mouse_move">#</a> *area*.**mouse_move**()

<a name="area-mouse_out" href="#area-mouse_out">#</a> *area*.**mouse_out**()

<a name="area-remove" href="#area-remove">#</a> *area*.**remove**()

<a name="area-x" href="#area-x">#</a> *area*.**x**()

<a name="area-y0" href="#area-y0">#</a> *area*.**y0**([*y*])

If *y* is specified, sets the y0 accessor to the specified function or number and returns this area. If *y* is not specified, returns the current y0 accessor, which defaults to the minimum y1 value of the data:

```javascript
function y() {
    return d3.min( area.data(), area.y1() );
}
```

<a name="area-y1" href="#area-y1">#</a> *area*.**y1**([*y*])

If *y* is specified, sets the y1 accessor to the specified function or number and returns this area. If *y* is not specified, returns the current y1 accessor, which defaults to the [chart's y accessor](#chart-y).

## Lines

<a name="chart-line" href="#chart-line">#</a> *chart*.**line**()

<a name="line-attr" href="#line-attr">#</a> *line*.**attr**(*name*[, *value*])

<a name="line-curve" href="#line-curve">#</a> *line*.**curve**()

<a name="line-data" href="#line-data">#</a> *line*.**data**([*data*])

<a name="line-hover" href="#line-hover">#</a> *line*.**hover**([*option*])

This method enables or disables mouse hover functionality. When enabled, hovering the mouse over the chart will cause a dot to be drawn on top of the data point closest to the x-coordinate of the mouse. If _option_ is a truthy value, hover will be enabled. If _option_ is a falsey value, hover will be disabled, which is the default. If _option_ is a function, hover will be enabled and the function will be called each time the x-coordinate of the mouse changes. The function will be passed a single argument, a struct containing the ID of the line, and the x- and y- values of the data point that is currently highlighted.

<a name="line-id" href="#line-id">#</a> *line*.**id**()

<a name="line-mouse_in" href="#line-mouse_in">#</a> *line*.**mouse_in**()

<a name="line-mouse_move" href="#line-mouse_move">#</a> *line*.**mouse_move**()

<a name="line-mouse_out" href="#line-mouse_out">#</a> *line*.**mouse_out**()

<a name="line-remove" href="#line-remove">#</a> *line*.**remove**()

<a name="line-x" href="#area-x">#</a> *line*.**x**()

<a name="line-y" href="#area-y">#</a> *line*.**y**()

## Scatters

<a name="chart-scatter" href="#chart-scatter">#</a> *chart*.**scatter**()

<a name="scatter-attr" href="#scatter-attr">#</a> *scatter*.**attr**(*name*[, *value*])

<a name="scatter-data" href="#scatter-data">#</a> *scatter*.**data**([*data*])

<a name="scatter-hover" href="#scatter-hover">#</a> *scatter*.**hover**()

<a name="scatter-id" href="#scatter-id">#</a> *scatter*.**id**()

<a name="scatter-mouse_in" href="#scatter-mouse_in">#</a> *scatter*.**mouse_in**()

<a name="scatter-mouse_move" href="#scatter-mouse_move">#</a> *scatter*.**mouse_move**()

<a name="scatter-mouse_out" href="#scatter-mouse_out">#</a> *scatter*.**mouse_out**()

<a name="scatter-remove" href="#scatter-remove">#</a> *scatter*.**remove**()

<a name="scatter-x" href="#scatter-x">#</a> *scatter*.**x**()

<a name="scatter-y" href="#scatter-y">#</a> *scatter*.**y**()

## Legends

<a name="chart-legend" href="#chart-legend">#</a> *chart*.**legend**([*id*])

Creates a new legend in *chart*. If *id* is specified, the legend will be created with that ID, otherwise one will be generated.

<a name="legend-attr" href="#legend-attr">#</a> *legend*.**attr**(*name*[, *value*])

<a name="legend-box_height" href="#legend-box_height">#</a> *legend*.**box_height**([*height*])

If *height* is specified, sets the height of the color box. If *height* is not specified, returns the current color box height. The default box height is 20px.

<a name="legend-box_padding" href="#legend-box_padding">#</a> *legend*.**box_padding**([*padding*])

If *padding* is specified, sets the amount of vertical space between legend items, as shown in [legend placement and spacing](#). If *padding* is not specified, returns the current box padding. The default spacing is 2px.

<a name="legend-box_width" href="#legend-box_width">#</a> *legend*.**box_width**([*width*])

If *width* is specified, sets the width of the color box. If *width* is not specified, returns the current color box width. The default box width is 20px.

<a name="legend-id" href="#legend-id">#</a> *legend*.**id**()

Returns the ID of the legend. If a specific ID is desired, it can be set when creating the legend with [chart.legend()](chart-legend).

<a name="legend-item" href="#legend-item">#</a> *legend*.**item**(*label*[, *item*])

If *item* is not specified, returns the item associated with *label*. If *item* is specified, adds *item* to the legend with the label *label*. *item* can be either a plottable, such as an [area](#chart-area), [line](#chart-line), or [scatter](#chart-scatter), or it can be a color string, such as 'steelblue' or '#000000'.

<a name="legend-label_padding" href="#legend-label_padding">#</a> *legend*.**label_padding**([*padding*])

If *padding* is specified, sets the amount of space between the label and the color box, as shown in [legend placement and spacing](#). If *padding* is not specified, returns the current padding. The default label padding is 5px.

<a name="legend-location" href="#legend-location">#</a> *legend*.**location**([*location*])

If *location* is specified, sets the location of the legend. Can be one of 'nw', 'ne', 'se', 'sw' as shown in [legend placement and spacing](#). If *location* is not specified, returns the current location of the legend. The default location is 'ne'.

<a name="legend-margin" href="#legend-margin">#</a> *legend*.**margin**([*margins*])

If *margins* is specified, updates the margins as shown in [legend placement and spacing](#). The *margins* object can have up to four properties, one for each side.

```javascript
var margins = { top: ..., right: ..., bottom: ..., left: ... };
```

Sides not included in the *margins* object will not be updated. If the *margins* object is not specified, returns the current margins. The default top, right, bottom, and left margins area 0px, 0px, 10px, and 10px, respectively.

<a name="legend-remove" href="#legend-remove">#</a> *legend*.**remove**([*item*])

If *item* is specified, removes the item from the legend. *item* can be either the label associated with an item or the item object itself. If *item* is not specified, removes the legend from the chart.

## Tools

<a name="d3-chart-linker" href="#d3-chart-linker">#</a> *d3*.*chart*.**linker**()