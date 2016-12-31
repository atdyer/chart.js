# d3-chart API

d3-chart is a small, hackable, d3-esque charting library. It is designed to be used in concert with D3 4.0. It began as an extension to the time-series-chart.js example from Mike Bostock's post on [reusable charts](https://bost.ocks.org/mike/chart/). As I was building charts for various projects, I often found myself starting with that code and adding functionality or hacking away at it to fit my needs, so I decided to start building my own version that would accumulate these new features. My hope is that this plugin will provide enough functionality to get charts 90% of the way there, and that the documentation and examples will be good enough that the last 10% is easily obtainable by making simple changes to the code as needed.

* [Charts](#charts) - Start by creating a chart
* [Areas](#areas) - Plotting of areas
* [Lines](#lines) - Plotting of lines
* [Scatters](#scatters) - Plotting of scatter sets
* [Tools](#tools) - Useful tools that work with charts

## Charts

How to create a chart.

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

<a name="area-attr" href="#area-attr">#</a> *area*.**attr**()

<a name="area-data" href="#area-data">#</a> *area*.**data**()

<a name="area-hover" href="#area-hover">#</a> *area*.**hover**()

<a name="area-id" href="#area-id">#</a> *area*.**id**()

<a name="area-mouse_in" href="#area-mouse_in">#</a> *area*.**mouse_in**()

<a name="area-mouse_move" href="#area-mouse_move">#</a> *area*.**mouse_move**()

<a name="area-mouse_out" href="#area-mouse_out">#</a> *area*.**mouse_out**()

<a name="area-remove" href="#area-remove">#</a> *area*.**remove**()


## Lines

<a name="chart-line" href="#chart-line">#</a> *chart*.**line**()

<a name="line-attr" href="#line-attr">#</a> *line*.**attr**()

<a name="line-data" href="#line-data">#</a> *line*.**data**()

<a name="line-hover" href="#line-hover">#</a> *line*.**hover**()

<a name="line-id" href="#line-id">#</a> *line*.**id**()

<a name="line-mouse_in" href="#line-mouse_in">#</a> *line*.**mouse_in**()

<a name="line-mouse_move" href="#line-mouse_move">#</a> *line*.**mouse_move**()

<a name="line-mouse_out" href="#line-mouse_out">#</a> *line*.**mouse_out**()

<a name="line-remove" href="#line-remove">#</a> *line*.**remove**()

This method enables or disables mouse hover functionality. When enabled, hovering the mouse over the chart will cause a dot to be drawn on top of the data point closest to the x-coordinate of the mouse. If _option_ is a truthy value, hover will be enabled. If _option_ is a falsey value, hover will be disabled, which is the default. If _option_ is a function, hover will be enabled and the function will be called each time the x-coordinate of the mouse changes. The function will be passed a single argument, a struct containing the ID of the line, and the x- and y- values of the data point that is currently highlighted.

## Scatters

<a name="chart-scatter" href="#chart-scatter">#</a> *chart*.**scatter**()

<a name="scatter-attr" href="#scatter-attr">#</a> *scatter*.**attr**()

<a name="scatter-data" href="#scatter-data">#</a> *scatter*.**data**()

<a name="scatter-hover" href="#scatter-hover">#</a> *scatter*.**hover**()

<a name="scatter-id" href="#scatter-id">#</a> *scatter*.**id**()

<a name="scatter-mouse_in" href="#scatter-mouse_in">#</a> *scatter*.**mouse_in**()

<a name="scatter-mouse_move" href="#scatter-mouse_move">#</a> *scatter*.**mouse_move**()

<a name="scatter-mouse_out" href="#scatter-mouse_out">#</a> *scatter*.**mouse_out**()

<a name="scatter-remove" href="#scatter-remove">#</a> *scatter*.**remove**()

## Tools

<a name="d3-chart-linker" href="#d3-chart-linker">#</a> *d3*.*chart*.**linker**()