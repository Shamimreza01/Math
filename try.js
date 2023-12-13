function graph(){
var trace1 = {
   x:math.range(-10,10,0.001), 
   y: [-10, 15, 13, 17], 
   mode: 'lines', 
   type: 'scatter', 
   name: 'trace1' };
var data = [trace1];

var layout = { 
  title: 'Scatter Plot Example',
  xaxis: { title: 'x-axis' }, 
  yaxis: { title: 'y-axis' }
 };
Plotly.newPlot ('myDiv', data, layout);

}
//var trace2 = { x: [-10, 3, 4, 5], y: [16, 5, 11, 9], mode: 'lines', type: 'scatter', name: 'trace2' };
//var trace3 = { x: [1, 2, 3, 4], y: [12, 9, 15, 12], mode: 'lines+markers', type: 'scatter', name: 'trace3' };
