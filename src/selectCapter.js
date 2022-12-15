export function calcOn() {
   let elemC = document.querySelector('#datecalc');
   elemC.removeAttribute('class');
   let elemT = document.querySelector('#timer');
   elemT.className = 'hidden';
   elemT = document.querySelector('#timerOut');
   elemT.className = 'hidden';
   elemT = document.querySelector('#startStop');
   elemT.className = 'hidden';
}
export function timOn()   {
    //clearInterval(intervalSet);
    let elemT = document.querySelector('#timer');
    elemT.removeAttribute('class');
    let elemC = document.querySelector('#datecalc');
    elemC.className = 'hidden';
 }