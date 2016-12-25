# d3-chart API

d3-chart is a small, hackable, d3-esque charting library. It is designed to be used in concert with D3 4.0. It began as an extension to the time-series-chart.js example from Mike Bostock's post on [reusable charts](https://bost.ocks.org/mike/chart/). As I was building charts for various projects, I often found myself starting with that code and adding functionality or hacking away at it to fit my needs, so I decided to start building my own version that would accumulate these new features. My hope is that this plugin will provide enough functionality to get charts 90% of the way there, and that the documentation and examples will be good enough that the last 10% is easily obtainable by making simple changes to the code as needed.

* [Charts](#charts) - Start by creating a chart
* [Lines](#lines) - Plotting of lines
* [Scatters](#scatters) - Plotting of scatter sets
* [Tools](#tools) - Useful tools that work with charts

## Charts

How to create a chart.

### *chart*.**each**()

### *chart*.**height**()

### *chart*.**hover**()

### *chart*.**id**()

### *chart*.**margin**()

### *chart*.**mouse_in**()

### *chart*.**mouse_out**()

### *chart*.**width**()

### *chart*.**x**()

### *chart*.**x_scale**()

### *chart*.**y**()

### *chart*.**y_scale**()

## Lines

### *chart*.**line**()

### *line*.**hover**( *option* )

This method enables or disables mouse hover functionality. When enabled, hovering the mouse over the chart will cause a dot to be drawn on top of the data point closest to the x-coordinate of the mouse. If _option_ is a truthy value, hover will be enabled. If _option_ is a falsey value, hover will be disabled, which is the default. If _option_ is a function, hover will be enabled and the function will be called each time the x-coordinate of the mouse changes. The function will be passed a single argument, a struct containing the ID of the line, and the x- and y- values of the data point that is currently highlighted.

## Scatters

### *chart*.**scatter**()

## Tools

### *chart*.**linker**()