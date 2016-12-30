
var js = window.location.pathname.split('/').pop().split('.')[0] + '.js';
var code = d3.select('body')
  .append('div')
  .append('pre')
  .append('code')
  .attr('id', 'code')
  .attr('class', 'js');

d3.text(js, function ( error, data ) {
    code.text(data.trim());
    hljs.highlightBlock(code.nodes()[ 0 ]);
});