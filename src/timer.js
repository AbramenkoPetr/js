
let step = 1;
export  function stopOn() {step = 0 };
export  function startOn() {step = 1 };
export function timerInOut() {
    let hour = parseInt(this.hour.value);
    let min = parseInt(this.min.value);
    let sec = parseInt(this.sec.value);
    let totalSec = hour*3600 + min*60 +sec;
    
function timerDisp()    {
    let elemTO = document.querySelector('#timerOut');
   elemTO.removeAttribute('class');
   let elemStartStop = document.querySelector('#startStop');
   elemStartStop.removeAttribute('class');
   
    if (totalSec < 3600) hour = 0;
        else hour = Math.trunc(totalSec/3600);
if (totalSec < 60) {min = 0;}
        else min = Math.trunc((totalSec - hour*3600)/60);
sec = Math.trunc(totalSec - hour*3600 - min*60);
    
    if (totalSec >= 0) {
document.getElementById("hour").innerHTML = hour;
document.getElementById("min").innerHTML = min;
document.getElementById("sec").innerHTML = sec;
    
    }
    else clearInterval(intervalSet);
totalSec = totalSec - step;}
            
    let intervalSet = setInterval(timerDisp , 1000);
    return false;

};