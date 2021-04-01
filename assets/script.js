// gather the selectors needed from the html
const currentDayEl = document.getElementById("current-day");
const timeBlockBoxEl = document.getElementById("time-block-box");

const customUtcOffset = 240; //mins

dayjs.extend(window.dayjs_plugin_buddhistEra)
dayjs.extend(window.dayjs_plugin_utc)
dayjs().format();

let day = dayjs()

console.log(`${day.$H}`)

// the current day is displayed at the top of the calendar
const showDate = function() {
    let d = dayjs();
    let bd = dayjs('2021', '09', '01');
    let now = dayjs(d).utcOffset(customUtcOffset);
    let nowEl = document.createElement("span")
    nowEl.textContent = `${now}`;
    currentDayEl.appendChild(nowEl);
}

// scrolling down presents time blocks for standard business hours
const renderHours = () => {
    // loop thru hours in a day
    for (let i = 0; i < 24; i++) {
        let hour = day.$H + i;
        
        if (hour >= 12) {
            hour -= 12;
        } 
        // create the row element here
        let hourRowEl = document.createElement("article");
        hourRowEl.classList = `row`;
        // and the hour display column
        let hourDisplay = document.createElement("span");
        hourDisplay.classList = `col-2 d-flex border-left text-center align-items-center`;
        hourDisplay.textContent = `${hour}`;
        // notes column
        let hmmsDisplay = document.createElement(`p`);
        hmmsDisplay.classList = `col-9 border-left`;

        // edit & save buttoneds column
        let buttonCol = document.createElement("div")
        buttonCol.classList = `col-1 border-left border-right d-flex flex-column justify-content-center`;
        let editButton = document.createElement("p");
        editButton.innerHTML = `<i class="fas fa-burn"></i>`;
        let trashButton = document.createElement("p");
        trashButton.innerHTML = `<i class="fas fa-bong"></i>`;
        buttonCol.append(editButton, trashButton);

        hourRowEl.append(hourDisplay, hmmsDisplay, buttonCol);
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