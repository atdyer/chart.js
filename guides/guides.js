d3.selectAll('pre code').each(function () {
    var s = d3.select(this);
    s.text(s.text().replace(/\n\s*/g, '\n').replace(/^\n/g, ''));
    hljs.highlightBlock(s.node());
});

d3.selectAll('code').filter(function ( d, i ) {
    return !d3.select(this).classed('hljs');
}).each(function () {
    hljs.highlightBlock(d3.select(this).node());
});