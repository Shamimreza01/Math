function $(id) { return document.getElementById(id); }
   function show(elmnt) { $(elmnt).style.display = "block"; }
   function hide(elmnt) { $(elmnt).style.display = "none"; }
   function show(e) { $(e).style.display = "block"; }
   function hide(e) { $(e).style.display = "none"; }

   function conv() {
   "bisection" == $("root_finding_method_selection").value ? show("bisection") : hide("bisection");
   "false_position" == $("root_finding_method_selection").value ? show("falsePosition") : hide("falsePosition");
   "iteration" == $("root_finding_method_selection").value ? show("iteration") : hide("iteration");
   "newton_Rapson"== $("root_finding_method_selection").value ? show("newtonRapson") : hide("newtonRapson");
   }
   



  /* ---------------------------------------graph draw start-------------------------------------------------------*/
   // drawing graph anywhere part start
   function draw(expression) {
    try {
      // compile the expression once
      const expr = math.compile(expression)

      // evaluate the expression repeatedly for different values of x
      const xValues = math.range(-10, 10, 0.1).toArray()
      const yValues = xValues.map(function (x) {
        return expr.evaluate({x: x})
      })

      // render the plot using plotly
      const trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter'
      }
      const data = [trace1]
      Plotly.newPlot (graph, data);
    }
    catch (err) {
      document.getElementById("graph").innerHTML="<div>this is a invalid equation"+"</br>"+ "please enter a correct"+"</br>"+" requested by shamim</div> ";
    }
  }

  /* ---------------------------------------graph draw end-------------------------------------------------------*/





    /* ---------------------------------------bisection part start -------------------------------------------------------*/

 // for drawing graph
  function graphForbisection(){
    const expression = document.getElementById("bisection_Equation").value;
    draw(expression);
   }

 //for root finding bisection part 
   function bisection_rootFinder(){
    const equationInput=document.getElementById("bisection_Equation");
    const intervalAInput=document.getElementById("bisection_interval_a");
    const intervalBInput=document.getElementById("bisection_interval_b");
    const resultDiv=document.getElementById("bisection_result");
    const stepsTable=document.getElementById("steps_table");

        const equation=equationInput.value;
        let a=parseFloat(intervalAInput.value);
        let b=parseFloat(intervalBInput.value);
     if(isNaN(a)||isNaN(b))
      {
            resultDiv.textContent="Please enter valid interval values.";
            return NaN;
      }
       let fx=math.compile(equation);
       let fa=fx.evaluate({x:a});
        let fb=fx.evaluate({x:b});
        let c;
        let fc;
        if(fa*fb<0){
            if(fa===0){
             resultDiv.textContent="Your required root is: "+a;
             return;
            }else if(fb===0){
             resultDiv.textContent="Your required root is: "+b;
             return;
            }else{
                let tableHTML="<table><tr><th> steps </th><th>a<br>f(a)</th>   <th>b<br>f(b)</th> <th>c<br>f(c)</th> </tr>";
                let stepCount=0;
                
                while(Math.abs(a-b)>=0.00001)
                {
                    if(Math.abs(fc)<=0.00001)
                    {
                        resultDiv.textContent="Your required root is : "+c;break;
                    }
                    let tempa=a;let tempb=b;
                    let fa=fx.evaluate({x:a});
                    let fb=fx.evaluate({x:b});
                    c=math.divide(math.add(a,b),2);
                    fc=fx.evaluate({x:c});
                    let accepted='';
                    if(fc*fx.evaluate({x:a})<0)
                    {
                        b=c;
                        accepted=`<br><br>a=${tempa.toFixed(4)},b=${tempb.toFixed(4)} : a is accepted in this interval. <br> because f(a)Xf(c)<0 now b=${c.toFixed(5)}<br><br>`;
                        tableHTML+=`<tr><td colspan="4">${accepted}</td></tr>`;
                    }else{
                        a=c;
                        accepted=`<br><br>a=${tempa.toFixed(4)},b=${tempb.toFixed(7)} : b is accepted in this interval. <br> because f(b)Xf(c)<0 now a=${c.toFixed(5)}<br><br>`;
                        tableHTML+=`<tr><td colspan="4">${accepted}</td></tr>`;
                    }
                    stepCount++;
                    tableHTML+=`<tr><td> ${stepCount} </td><td> ${tempa.toFixed(7)} <br>${fa.toFixed(7)}</td><td>${tempb.toFixed(7)}<br>${fb.toFixed(7)}</td><td>${c.toFixed(7)}<br>${fc.toFixed(7)}</td></tr>`;}
                    tableHTML+='</table';
                    resultDiv.textContent="Your required root is: "+c;
                    stepsTable.innerHTML=tableHTML;
                    stepsTable.style.display="block";
                    if (window.matchMedia("(max-width: 700px)").matches) {
                        document.getElementById("root_finder_box").style.height=1400+"px";
                      } else {
                        document.getElementById("root_finder_box").style.height=780+"px";
                      }
                
                    stepsTable.style.display="block";
                }
            }else{
        resultDiv.textContent="No required root contained in this interval.";
        stepsTable.innerHTML="";
      }
   }
 

  /* ---------------------------------------bisection part end-------------------------------------------------------*/




  /* --------------------------------------false position part start------------------------------------------------------*/
  // for false position graph
function graphForfalseposition(){
    const expression = document.getElementById("fp_Equation").value;
    draw(expression);
   }

// function for false position root solving
   function falsePosition_rootFinder(){
    const equationInput=document.getElementById("fp_Equation");
    const intervalAInput=document.getElementById("fp_interval_a");
    const intervalBInput=document.getElementById("fp_interval_b");
    const resultDiv=document.getElementById("fp_result");
    const stepsTable=document.getElementById("steps_table");

        const equation=equationInput.value;
        let a=parseFloat(intervalAInput.value);
        let b=parseFloat(intervalBInput.value);
     if(isNaN(a)||isNaN(b))
      {
            resultDiv.textContent="Please enter valid interval values.";
            return;
      }
       let fx=math.compile(equation);
       let fa=fx.evaluate({x:a});
        let fb=fx.evaluate({x:b});
        let c;
        let fc;
        if(fa*fb<0){
            if(fa===0){
             resultDiv.textContent="Your required root is: "+a;
             return;
            }else if(fb===0){
             resultDiv.textContent="Your required root is: "+b;
             return;
            }else{
                let tableHTML="<table><tr><th> steps </th><th>a<br>f(a)</th>   <th>b<br>f(b)</th> <th>c<br>f(c)</th> </tr>";
                let stepCount=0;
                
                while(Math.abs(a-b)>=0.00001)
                {
                    if(Math.abs(fc)<=0.00001)
                    {
                        resultDiv.textContent="Your required root is : "+c;break;
                    }
                    let tempa=a;let tempb=b;
                    let fa=fx.evaluate({x:a});
                    let fb=fx.evaluate({x:b});
                    c=(a*fb-b*fa)/(fb-fa);
                    fc=fx.evaluate({x:c});
                    let accepted='';
                    if(fc*fx.evaluate({x:a})<0)
                    {
                        b=c;
                        accepted=`<br><br>a=${tempa.toFixed(4)},b=${tempb.toFixed(4)} : a is accepted in this interval. <br> because f(a)Xf(c)<0 now b=${c.toFixed(5)}<br><br>`;
                        tableHTML+=`<tr><td colspan="4">${accepted}</td></tr>`;
                    }else{
                        a=c;
                        accepted=`<br><br>a=${tempa.toFixed(4)},b=${tempb.toFixed(7)} : b is accepted in this interval. <br> because f(b)Xf(c)<0 now a=${c.toFixed(5)}<br><br>`;
                        tableHTML+=`<tr><td colspan="4">${accepted}</td></tr>`;
                    }
                    stepCount++;
                    tableHTML+=`<tr><td> ${stepCount} </td><td> ${tempa.toFixed(7)} <br>${fa.toFixed(7)}</td><td>${tempb.toFixed(7)}<br>${fb.toFixed(7)}</td><td>${c.toFixed(7)}<br>${fc.toFixed(7)}</td></tr>`;}
                    tableHTML+='</table';
                    resultDiv.textContent="Your required root is: "+c;
                    stepsTable.innerHTML=tableHTML;
                    stepsTable.style.display="block";
                    if (window.matchMedia("(max-width: 700px)").matches) {
                        document.getElementById("root_finder_box").style.height=1400+"px";
                      } else {
                        document.getElementById("root_finder_box").style.height=780+"px";
                      }
                
                    stepsTable.style.display="block";
                }
            }else{
        resultDiv.textContent="No required root contained in this interval.";
        stepsTable.innerHTML="";
      }

   }


  /* ---------------------------------------false position part end-------------------------------------------------------*/




  /* ---------------------------------------iteration method start-------------------------------------------------------*/
// for iteration graph
function graphForiteration(){
    const expression = document.getElementById("iteration_Equation").value;
    draw(expression);
   }
//for iteration root solving
   function iteration_rootFinder() {
    const equationInput = document.getElementById("iteration_Equation");
    const initialPoint = document.getElementById("iteration_initial_guss");
    const resultDiv = document.getElementById("iteration_result");
    const stepsTable = document.getElementById("steps_table");
  
    try {
      equation = equationInput.value;
      let x0 = parseFloat(initialPoint.value);
      const dfx = math.derivative(equation, 'x');
      let fx = math.compile(equation);
      let dfx0 = dfx.evaluate({ x: x0 });
      let result = "";
  
      if (dfx0 > 1) {
        resultDiv.textContent = "This is not convergent for this initial point.";
        return;
      } else {
        let i = 0;
        let maxIter = 100;
        let tolerance = 0.0001; // Set a more appropriate tolerance value
  
        while (Math.abs(fx.evaluate({ x: x0 })) >= tolerance) {
          x0 = fx.evaluate({ x: x0 });
          i++;
          result += "Your " + i + " iterative value is " + x0 + "<br>";
          if (i >= maxIter) break;
        }
  
        result+="Your approximate root is " + x0;
        resultDiv.innerHTML= result;
        return x0;
      }
    } catch (error) {
      resultDiv.innerText = "An error occurred: " + error.message;
      return;
    }

  }


  /* --------------------------------------iteration method end-------------------------------------------------------*/



  /* ---------------------------------------newton raphson  method start-------------------------------------------------------*/
// for newton raphson method graph
function graphFornewtonraphson(){
    const expression = document.getElementById("nr_Equation").value;
    draw(expression);
   }

// function for newton raphson root solving
  function newtonRaphson_rootFinder(){ 
    const equationInput = document.getElementById("nr_Equation"); 
    const initialInput = document.getElementById("nr_initial_guess"); 
    const resultDiv = document.getElementById("nr_result"); 
    const stepsTable = document.getElementById("step_table");

    const equation = equationInput.value;
    let x0 = parseFloat(initialInput.value);
    if(isNaN(x0)){
        resultDiv.textContent = "Please enter a valid initial value.";
        return;
    }
    let fx = math.compile(equation);
    let f0 = fx.evaluate({x:x0});
    let f1 = math.derivative(equation, 'x').evaluate({x:x0});
    let x1;
    let f2;
    if(f0 === 0){
        resultDiv.textContent = "Your required root is: " + x0;
        return;
    }else if(f1 === 0){
        resultDiv.textContent = "The derivative of the function is zero at the initial value. Please choose a different initial value.";
        return;
    }else{
        let tableHTML = "<table><tr><th> steps </th><th>x0<br>f(x0)</th>   <th>f'(x0)</th> <th>x1<br>f(x1)</th> </tr>";
        let stepCount = 0;
    
        while(Math.abs(f0) >= 0.00001){
            x1 = x0 - f0/f1;
            f2 = fx.evaluate({x:x1});
            if(Math.abs(f2) <= 0.00001){
                resultDiv.textContent = "Your required root is : " + x1;
                break;
            }
            let temp0 = x0;
            let temp1 = x1;
            let ftemp0 = f0;
            let ftemp1 = f2;
            let ftemp1p = f1;
            x0 = x1;
            f0 = f2;
            f1 = math.derivative(equation, 'x').evaluate({x:x0});
            stepCount++;
            tableHTML += `<tr><td> ${stepCount} </td><td> ${temp0.toFixed(7)} <br>${ftemp0.toFixed(7)}</td><td>${ftemp1p.toFixed(7)}</td><td>${temp1.toFixed(7)}<br>${ftemp1.toFixed(7)}</td></tr>`;
        }
        tableHTML += '</table>';
        resultDiv.textContent = "Your required root is: " + x1;
        stepsTable.innerHTML = tableHTML;
        stepsTable.style.display = "block";
        if (window.matchMedia("(max-width: 700px)").matches) {
            document.getElementById("root_finder_box").style.height=1400+"px";
          } else {
            document.getElementById("root_finder_box").style.height=780+"px";
          }
        stepsTable.style.display = "block";
    }
    }

  /* ---------------------------------------newton method end-------------------------------------------------------*/
