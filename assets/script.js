// gather the selectors needed from the html
const currentDayEl = document.getElementById("current-day");
const timeBlockBoxEl = document.getElementById("time-block-box");
let notesObj = {
     9: ' ',
    10: ' ',
    11: ' ',
    12: ' ',
    13: 'click to leave note!',
    14: ' ',
    15: ' ',
    16: ' ',
    17: ' '
}; // access these props as you would an array, with notesObj[n]

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
        hourRowEl.classList = `row d-flex border justify-content-center`;
        // and the hour display column
        let hourDisplay = document.createElement("span");
        hourDisplay.classList = `col-1 d-flex border-left border-right text-center align-items-center`;
        hourDisplay.textContent = `${hour}${meridiem}`;
        hourDisplay.setAttribute("data-hour", `hour-${i}`);
        // notes column
        let notesEl = document.createElement('div');
        notesEl.setAttribute("data-hour", `note-${i}`);
        notesEl.textContent = `${notesObj[i]}`;
        notesEl.classList = `note card-body`;
        // save button column
        let buttonCol = document.createElement("div");
        buttonCol.classList = `col-1 border-left border-right d-flex flex-column justify-content-center`;
        let saveButton = document.createElement("p");
        saveButton.innerHTML = `<i class="save-button fas fa-burn" data-hour="save-"></i>`;
        saveButton.setAttribute("data-hour", `save-${i}`);
        buttonCol.append(saveButton);
        // append to the row, then into the time block container
        hourRowEl.append(hourDisplay, notesEl, buttonCol);
        timeBlockBoxEl.appendChild(hourRowEl);
        notesEl.addEventListener("click", function(e) {editHandler(e)});
    }   
}

// each block is color-coded to indicate whether it is in the past, present, or future

// this handler changes the p ele to a textarea, allowing editing of the note
let editHandler = (e) => {
    // click into a time block, can enter an event
    e.target.removeEventListener("click", (e) => {editHandler(e)});
    let hourDataNote = e.target.getAttribute(`data-hour`);
    let hour = hourDataNote.substr(5); // get the hour number from the data attr
    if (e.target.classList.contains('note')) {
        if (document.getElementById(`note-edit`) === null) {
            // checks for an actively editing task first, allowing only one edit at a time
            let noteEl = e.target;
            let note = e.target.textContent;
            noteEl.textContent = '';
            // when clicking the note, will replace it with a textarea element that has the same  
            e.target.textContent = ``;
            // create a new textarea element to hold the editables
            let noteEditEl = document.createElement("textarea");
            noteEditEl.textContent = `${note}`
            noteEditEl.setAttribute("id", "note-edit");
            noteEditEl.setAttribute("data-hour", `note-${hour}`);
            e.target.appendChild(noteEditEl)
            let saveButton = document.querySelector(`[data-hour="save-${hour}"]`)
            // adds a listener to each button, callin save handling function
            saveButton.addEventListener("click", (e) => saveHandler(e, hour));
        } else {
            console.log("")
        }
    }
    
}

const saveHandler = (e, hour) => {
    // find the element to capture the notes from
    let noteEditEl = document.getElementById(`note-edit`); // the textarea
    // use value for inputs like textarea!! but check if there's content first
    if (noteEditEl.value === null) {
        noteEditEl.value = ` `;
    }
    let notes = noteEditEl.value;
    noteEditEl.textContent = `${notes}`;
    // update the notes object
    notesObj[hour] = notes;
    // saves to local storage
    localStorage.setItem("notesObj", JSON.stringify(notesObj));
    // and reconverts it to p ele
    let noteSaveEl = document.querySelector(`[data-hour="note-${hour}"]`)
    noteSaveEl.textContent = `${notes}`;
    noteSaveEl.classList = `note card-body`;
    // replaces the textarea with the divvy
    noteEditEl.replaceWith(noteSaveEl);
}


// refreshing the page, the saved events persist
const schedLoader = () => {
    if (localStorage.getItem(`notesObj`) === null) {
        localStorage.setItem('notesObj', JSON.stringify(notesObj));
    }
    notesObj = JSON.parse(localStorage.getItem(`notesObj`));
};


showDate();
schedLoader();
renderHours();


// adds an event listener to the div holding the notes element