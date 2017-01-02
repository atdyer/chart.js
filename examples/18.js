var parseTime = d3.timeParse('%d-%b-%y');
var width = parseInt(d3.select('#chart').style('width'));

d3.tsv('data/apple_stock.tsv', function ( d ) {

    return [ parseTime(d.date), +d.close ];

}, function ( error, data ) {

    if ( error ) throw error;

    data = data.slice(110,120);

    var chart = d3.chart()
                  .width(width)
                  .x_axis(d3.axisBottom())
                  .y_axis(d3.axisLeft())
                  .x_scale(d3.scaleTime());

    chart.area()
         .data(data)
         .curve(d3.curveMonotoneX);

    chart.line()
         .data(data)
         .curve(d3.curveMonotoneX)
         .attr('stroke-width', 3.5)
         .attr('stroke', '#3f5382');

    chart.scatter()
         .data(data)
         .attr('r', 4)
         .attr('stroke', '#3f5382')
         .attr('stroke-width', 3.5)
         .attr('fill', 'white');

    d3.select('#chart')
      .call(chart);

});