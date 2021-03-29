// gather the selectors needed from the html
let currentDayEl = document.getElementById("current-day");
let timeBlockBoxEl = document.getElementById("time-block-box");
// let buddhistEra = ('https://cdn.jsdelivr.net/npm/dayjs/plugin/buddhistEra.js');
// dayjs.extend(buddhistEra);
// dayjs().format('BBBB BB');

// the current day is displayed at the top of the calendar
const showDate = function() {
    let d = new Date();
    let bd = new Date(2021, 9, 01);
    let now = dayjs(d);
    let nowEl = document.createElement("span")
    nowEl.textContent = `${now}`;
    console.log(now);
    currentDayEl.appendChild(nowEl);
}

// scrolling down presents time blocks for standard business hours

// each block is color-coded to indicate whether it is in the past, present, or future

// click into a time block, can enter an event

// clicking save button for time block, the text from that event is saved in localStorage

// refreshing the page, the saved events persist
const schedLoader = function() {
    
}

showDate();