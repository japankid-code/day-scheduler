// gather the selectors needed from the html
const currentDayEl = document.getElementById("current-day");
const timeBlockBoxEl = document.getElementById("time-block-box");
let notesObj = {
    09: ``,
    10: ``,
    11: ``,
    12: ``,
    13: ``,
    14: ``,
    15: ``,
    16: ``,
    17: ``
};

const customUtcOffset = 240; //mins



// the current day is displayed at the top of the calendar
const showDate = () => {

    let now = dayjs().format();
    let nowEl = document.createElement("span")
    nowEl.textContent = `${now}`;
    currentDayEl.appendChild(nowEl);
}

// scrolling down presents time blocks for standard business hours
const renderHours = () => {
    // loop thru hours in a day
    for (let i = 9; i < 18; i++) {
        let hour = i;
        let meridiem = `ᵃᵐ`; // for the AMs
        if (i > 11) {
            meridiem = `ᵖᵐ`; // for the PMs
            if (i > 12) {
                hour -= 12; // for the afternoon :)
            }
        }
        // create the row element here
        let hourRowEl = document.createElement("article");
        hourRowEl.classList = `row d-flex justify-content-center`;
        // and the hour display column
        let hourDisplay = document.createElement("span");
        hourDisplay.classList = `col-1 d-flex border-left text-center align-items-center`;
        hourDisplay.textContent = `${hour}${meridiem}`;
        hourDisplay.setAttribute("data-hour", `${i}`);
        // notes column
        let noteBoxEl = document.createElement(`div`);
        noteBoxEl.classList = `note-card card col-10 border-left`;
        noteBoxEl.setAttribute("data-hour", `${i}`);
        let notesEl = document.createElement('p')
        notesEl.setAttribute("data-hour", `${i}`);
        notesEl.textContent = `something at ${i}`;
        notesEl.classList = `note card-body`;
        noteBoxEl.append(notesEl);

        // save button column
        let buttonCol = document.createElement("div")
        buttonCol.classList = `col-1 border-left border-right d-flex flex-column justify-content-center`;
        let saveButton = document.createElement("p");
        saveButton.innerHTML = `<i class="save-button fas fa-burn"></i>`;
        saveButton.setAttribute("data-hour", `${i}`);
        buttonCol.append(saveButton);

        hourRowEl.append(hourDisplay, noteBoxEl, buttonCol);
        timeBlockBoxEl.appendChild(hourRowEl);
    }   

}

// each block is color-coded to indicate whether it is in the past, present, or future

// this handler changes the p ele to a textarea and enable saving the contents
// and reconverting to p ele after clicking the button
let saveHandler = (e) => {
    // click into a time block, can enter an event    
    if (e.target.classList.contains('note')) {
        let noteEl = e.target;
        let hour = e.target.getAttribute(`data-hour`);
        let note = e.target.textContent;
        console.log(noteEl);
        noteEl.textContent = '';
        // when clicking the note, will replace it with a textarea element that has the same 
        e.target.textContent = ``;
        let noteEditEl = document.createElement("textarea");
        noteEditEl.textContent = `${note}`
        noteEditEl.setAttribute("id", "note-edit");
        e.target.appendChild(noteEditEl)
        
    }
    // clicking save button for time block, the text from that event is saved in localStorage
    // and the textarea gets converted back into a p ele
    if (e.target.classList.contains(`save-button`)) {
        let hour = e.target.getAttribute(`data-hour`);
        
    }
}



// refreshing the page, the saved events persist
const schedLoader = function() {
    
}

showDate();
renderHours();


// adds an event listener to the div holding the notes element
timeBlockBoxEl.addEventListener("click", (e) => {saveHandler(e)});