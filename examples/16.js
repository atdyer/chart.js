var parseTime = d3.timeParse('%d-%b-%y');
var width = parseInt(d3.select('#chart').style('width'));
var area, line, scatter;

d3.tsv('data/apple_stock.tsv', function ( d ) {

    return [ parseTime(d.date), +d.close ];

}, function ( error, data ) {

    if ( error ) throw error;

    data = data.slice(0,25);

    var chart = d3.chart()
        .width(width)
        .x_axis(d3.axisBottom())
        .y_axis(d3.axisLeft())
        .x_scale(d3.scaleTime());

    d3.select('#addarea').on('click', function () {

        area = chart.area()
            .data(data)
            .attr('fill', '#e7e7e7');

        draw();

        d3.select(this).classed('inactive', true);
        d3.select('#remarea').classed('inactive', false);
    });

    d3.select('#addline').on('click', function () {

        line = chart.line()
            .data(data)
            .attr('stroke', '#666')
            .attr('stroke-width', 2.5)
            .attr('stroke-linecap', 'round')
            .attr('stroke-linejoin', 'round');

        draw();

        d3.select(this).classed('inactive', true);
        d3.select('#remline').classed('inactive', false);
    });

    d3.select('#addscatter').on('click', function () {

        scatter = chart.scatter()
            .data(data)
            .attr('r', 4)
            .attr('fill', '#666');

        draw();

        d3.select(this).classed('inactive', true);
        d3.select('#remscatter').classed('inactive', false);
    });

    d3.select('#remarea').on('click', function () {

        area.remove();
        draw();

        d3.select(this).classed('inactive', true);
        d3.select('#addarea').classed('inactive', false);
    });

    d3.select('#remline').on('click', function () {

        line.remove();
        draw();

        d3.select(this).classed('inactive', true);
        d3.select('#addline').classed('inactive', false);
    });

    d3.select('#remscatter').on('click', function () {

        scatter.remove();
        draw();

        d3.select(this).classed('inactive', true);
        d3.select('#addscatter').classed('inactive', false);
    });

    function draw () {
        d3.select('#chart')
            .call(chart);
    }

    draw();

});