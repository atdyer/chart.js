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

<a name="" href="#">#</a> *chart*.**x**()

<a name="" href="#">#</a> *chart*.**x_axis**()

<a name="" href="#">#</a> *chart*.**x_grid**()

<a name="" href="#">#</a> *chart*.**x_label**()

<a name="" href="#">#</a> *chart*.**x_location**([*location*])

<a name="" href="#">#</a> *chart*.**x_scale**()

<a name="" href="#">#</a> *chart*.**y**()

<a name="" href="#">#</a> *chart*.**y_axis**()

<a name="" href="#">#</a> *chart*.**y_grid**()

<a name="" href="#">#</a> *chart*.**y_label**()

<a name="" href="#">#</a> *chart*.**y_location**([*location*])

<a name="" href="#">#</a> *chart*.**y_scale**()

## Areas

<a name="" href="#">#</a> *chart*.**area**()

<a name="" href="#">#</a> *area*.**attr**()

<a name="" href="#">#</a> *area*.**data**()

<a name="" href="#">#</a> *area*.**hover**()

<a name="" href="#">#</a> *area*.**id**()

<a name="" href="#">#</a> *area*.**mouse_in**()

<a name="" href="#">#</a> *area*.**mouse_move**()

<a name="" href="#">#</a> *area*.**mouse_out**()

<a name="" href="#">#</a> *area*.**remove**()


## Lines

<a name="" href="#">#</a> *chart*.**line**()

<a name="" href="#">#</a> *line*.**attr**()

<a name="" href="#">#</a> *line*.**data**()

<a name="" href="#">#</a> *line*.**hover**()

<a name="" href="#">#</a> *line*.**id**()

<a name="" href="#">#</a> *line*.**mouse_in**()

<a name="" href="#">#</a> *line*.**mouse_move**()

<a name="" href="#">#</a> *line*.**mouse_out**()

<a name="" href="#">#</a> *line*.**remove**()

This method enables or disables mouse hover functionality. When enabled, hovering the mouse over the chart will cause a dot to be drawn on top of the data point closest to the x-coordinate of the mouse. If _option_ is a truthy value, hover will be enabled. If _option_ is a falsey value, hover will be disabled, which is the default. If _option_ is a function, hover will be enabled and the function will be called each time the x-coordinate of the mouse changes. The function will be passed a single argument, a struct containing the ID of the line, and the x- and y- values of the data point that is currently highlighted.

## Scatters

<a name="" href="#">#</a> *chart*.**scatter**()

<a name="" href="#">#</a> *scatter*.**attr**()

<a name="" href="#">#</a> *scatter*.**data**()

<a name="" href="#">#</a> *scatter*.**hover**()

<a name="" href="#">#</a> *scatter*.**id**()

<a name="" href="#">#</a> *scatter*.**mouse_in**()

<a name="" href="#">#</a> *scatter*.**mouse_move**()

<a name="" href="#">#</a> *scatter*.**mouse_out**()

<a name="" href="#">#</a> *scatter*.**remove**()

## Tools

<a name="" href="#">#</a> *d3*.*chart*.**linker**()