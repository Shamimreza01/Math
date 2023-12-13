document.addEventListener("DOMContentLoaded",function()
{
    const equationInput=document.getElementById("bisection-equation");
    const intervalAInput=document.getElementById("bisection-interval-a");
    const intervalBInput=document.getElementById("bisection-interval-b");
    const resultDiv=document.getElementById("result");
    const stepsTable=document.getElementById("steps-table");
    function bisection()
    {
        const equation=equationInput.value;
        let a=parseFloat(intervalAInput.value);
        let b=parseFloat(intervalBInput.value);
        if(isNaN(a)||isNaN(b))
        {
            resultDiv.textContent="Please enter valid interval values.";
            return;
        }
        const fx=math.compile(equation);
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
                    document.getElementById("tryit").style.height=(370+stepCount*155)+"px";
                    stepsTable.style.display="block";
                }
            }else{
    resultDiv.textContent="No required root contained in this interval.";stepsTable.innerHTML="";
}
}
document.getElementById("calculate-button").addEventListener("click",bisection);
}
);