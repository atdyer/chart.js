// Build API links
d3.select('body')
    .selectAll('.api')
    .each(function () {
        var a = d3.select(this);
        a.attr('href', 'https://github.com/atdyer/d3-chart/blob/gh-pages/API.md#' + a.attr('href'));
    });

// Fetch and highlight code
var js = window.location.pathname.split('/').pop().split('.')[0] + '.js';
var code = d3.select('body')
    .append('div')
    .append('pre')
    .append('code')
    .attr('id', 'code')
    .attr('class', 'js');

d3.text(js, function ( error, data ) {
    code.text(data.trim());
    d3.selectAll('pre code').each(function () {
        hljs.highlightBlock(d3.select(this).nodes()[0]);
    });
});