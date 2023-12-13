function plotGraph(equation) 
{ 
    try 
    { 
        const parser = math.parser(); 
        parser.evaluate('f(x) = ' + equation); 
        const xValues = math.range(-10, 10, 0.1).toArray(); 
        const yValues = xValues.map(x => parser.evaluate('f(' + x + ')')); 
        const trace = { x: xValues, y: yValues, mode: "lines", type: "scatter", }; 
        const layout = { 
            title: `Graph of ${equation}`, 
            xaxis: { title: "x-axis" }, 
            yaxis: { title: "y-axis" },
         }; const data = [trace]; 
         Plotly.newPlot(graphDiv, data, layout);
         }
          catch (error) 
          { 
            console.error("Error plotting graph:", error); 
            alert("Invalid equation. Please enter a valid equation.");
    }
}

