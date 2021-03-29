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
    currentDayEl.appendChild(nowEl);
}

// scrolling down presents time blocks for standard business hours
const renderHours = function() {
    // loop thru hours in a day
    for (let i = 0; i < 24; i++) {
        let hour = dayjs().hour([i]);
        // create the row element here
        let hourRowEl = document.createElement("article");
        hourRowEl.classList = `row`;
        // and the hour display column
        let hourDisplay = document.createElement("p");
        hourDisplay.classList = `col-2`;
        hourDisplay.textContent = `${hour}`;
        // notes column
        let hmmsDisplay = document.createElement(`textarea`);
        hmmsDisplay.classList = `col-8`;

        // edit & save buttoneds column
        let buttonCol = document.createElement("div")
        buttonCol.classList = `col-2`;
        let editButton = document.createElement("p");
        editButton.innerHTML = `<i class="fas fa-burn"></i>`;
        let trashButton = document.createElement("p");
        trashButton.innerHTML = `<i class="fas fa-bong"></i>`;

        buttonCol.appendChild(editButton);

        hourRowEl.appendChild(hourDisplay)
        timeBlockBoxEl.appendChild(hourRowEl);
    }   

    // each timeblock has an input field and save button

    // clicking time block's save button saves the input text to local storage
}
    

// each block is color-coded to indicate whether it is in the past, present, or future

// click into a time block, can enter an event

// clicking save button for time block, the text from that event is saved in localStorage

// refreshing the page, the saved events persist
const schedLoader = function() {
    
}

showDate();
renderHours();