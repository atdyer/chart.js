# d3-chart API

d3-chart is a small, hackable, d3-esque charting library. It is designed to be used in concert with D3 4.0. It began as an extension to the time-series-chart.js example from Mike Bostock's post on [reusable charts](https://bost.ocks.org/mike/chart/). As I was building charts for various projects, I often found myself starting with that code and adding functionality or hacking away at it to fit my needs, so I decided to start building my own version that would accumulate these new features. My hope is that this plugin will provide enough functionality to get charts 90% of the way there, and that the documentation and examples will be good enough that the last 10% is easily obtainable by making simple changes to the code as needed.

* [Charts](#charts) - Start by creating a chart
* [Lines](#lines) - Plotting of lines
* [Scatters](#scatters) - Plotting of scatter sets
* [Tools](#tools) - Useful tools that work with charts

## Charts

How to create a chart.

### *chart*.**domain**()

### *chart*.**each**()

### *chart*.**height**([*h*])

Returns the outer height of the chart. Internally, the height is maintained according to the [margin convention](http://bl.ocks.org/mbostock/3019563), but the height value returned here will include the top and bottom margins. If *h* is specified, sets the external height of the chart.

### *chart*.**hover**()

### *chart*.**id**()

### *chart*.**margin**()

### *chart*.**mouse_in**()

### *chart*.**mouse_out**()

### *chart*.**range**()

### *chart*.**width**([*w*])

Returns the outer width of the chart. Internally, the width is maintained according to the [margin convention](http://bl.ocks.org/mbostock/3019563), but the width value returned here will include the left and right margins. If *w* is specified, sets the external width of the chart.

### *chart*.**x**()

### *chart*.**x_axis**()

### *chart*.**x_grid**()

### *chart*.**x_location**([*location*])

### *chart*.**x_scale**()

### *chart*.**y**()

### *chart*.**y_axis**()

### *chart*.**y_grid**()

### *chart*.**y_location**([*location*])

### *chart*.**y_scale**()

## Lines

### *chart*.**line**()

### *line*.**hover**( *option* )

This method enables or disables mouse hover functionality. When enabled, hovering the mouse over the chart will cause a dot to be drawn on top of the data point closest to the x-coordinate of the mouse. If _option_ is a truthy value, hover will be enabled. If _option_ is a falsey value, hover will be disabled, which is the default. If _option_ is a function, hover will be enabled and the function will be called each time the x-coordinate of the mouse changes. The function will be passed a single argument, a struct containing the ID of the line, and the x- and y- values of the data point that is currently highlighted.

## Scatters

### *chart*.**scatter**()

## Tools

### *chart*.**linker**()