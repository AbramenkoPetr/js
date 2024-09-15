import "style-loader!css-loader!../style.css";

import { diffDates, diffToHtml } from "./datecalc.js";
import { formatError } from "./utils.js";
import { calcOn, timOn } from "./selectCapter.js";
import { timerInOut, stopOn, startOn } from "./timer.js";
//import {Howl, Howler} from './howler.js';

import chunk from "lodash/chunk";

console.log(chunk(["a", "b", "c", "d"]), 2)


const dateCalcForm = document.getElementById("datecalc");
const dateCalcResult = document.getElementById("datecalc__result");

dateCalcForm.addEventListener("submit", handleCalcDates);

function handleCalcDates(event) {
    
    dateCalcResult.innerHTML = "";
    event.preventDefault();

    let { firstDate, secondDate } = event.target.elements;
    firstDate = firstDate.value, secondDate = secondDate.value;

    if (firstDate && secondDate) {
        const diff = diffDates(firstDate, secondDate);
        dateCalcResult.innerHTML = diffToHtml(diff);
    }
    else dateCalcResult.innerHTML = formatError("Для расчета промежутка необходимо заполнить оба поля");
}
//
const onCalc = document.getElementById('calcDat');
onCalc.addEventListener("click", calcOn);

const onTim = document.getElementById('tim');
onTim.addEventListener("click", timOn);

const onStop = document.getElementById('stop');
onStop.addEventListener("click", stopOn);

const onStart = document.getElementById('start');
onStart.addEventListener("click", startOn);

document.forms.timer.onsubmit = timerInOut;

//var sound = new Howl({
//    src: ['chimes.wav', 'sound.mp3']
//  });

