'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
//console.log(fitlerPopup);
let fitlerLabel = document.querySelector('.filterLabel');
//console.log(fitlerLabel);
let filterIcon = document.querySelector('.filterIcon');

//filterIcon.addEventListener('click', function() {
    function fitlerLabelCl()  {
    console.log(fitlerPopup);
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
};

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});