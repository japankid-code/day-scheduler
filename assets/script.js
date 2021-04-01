// gather the selectors needed from the html
const currentDayEl = document.getElementById("current-day");
const timeBlockBoxEl = document.getElementById("time-block-box");

const customUtcOffset = 240; //mins

dayjs.extend(window.dayjs_plugin_buddhistEra)
dayjs.extend(window.dayjs_plugin_utc)
dayjs().format();

let day = dayjs()

console.log(`${day}`)

// the current day is displayed at the top of the calendar
const showDate = () => {
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
    for (let i = 9; i < 18; i++) {
        let hour = i;
        let meridiem = `ᵃᵐ`;
        if (i > 11) {
            meridiem = `ᵖᵐ`;
            if (i > 12) {
                hour -= 12;
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
        let hmmsDisplay = document.createElement(`div`);
        hmmsDisplay.classList = `note-card card col-10 border-left`;
        hmmsDisplay.setAttribute("data-hour", `${i}`);
        let notesEl = document.createElement('p')
        notesEl.setAttribute("data-hour", `${i}`);
        hmmsDisplay.append(notesEl);

        // save button column
        let buttonCol = document.createElement("div")
        buttonCol.classList = `col-1 border-left border-right d-flex flex-column justify-content-center`;
        let saveButton = document.createElement("p");
        saveButton.innerHTML = `<i class="fas fa-burn"></i>`;
        saveButton.setAttribute("data-hour", `${i}`);
        buttonCol.append(saveButton);

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



$(".list-group").on("click", "p", function() {
    var text = $(this).text();
    // clicking on the p will change it to a textarea
    var textInput = $("<textarea>").addClass("form-control").val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
    // click off the textarea
  });