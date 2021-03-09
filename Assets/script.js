// this is the section where I create my variables
var savedItems = {}
var currentDayAndTime = moment().format('LLL');
// console.log(currentDayAndTime)
// This is the array where todos can be saved
var toDoArray = []
toDoArray[9] = ""
toDoArray.fill("")
var isItSaved = true
// console.log(isItSaved)
if (isItSaved == true){
    var toDoArrayRaw = window.localStorage.getItem("toDoArray")
    if (!!toDoArrayRaw){
        toDoArray = JSON.parse(toDoArrayRaw)
    }
}

// this is the section where I make a function that grabs the current date and time from moment and displays it in the jumbotron when 
// page loads. it also must takes the savedItems array and puts saved to do information into the hours they were saved into
function startUpFunction(){
    var DateElement = document.getElementById("currentDay");
    DateElement.innerHTML = currentDayAndTime
    var hourRows = document.querySelector("#hourRows");

    // this goes through a loop and create times starting at 8AM and ending at 5PM and coresponding text fields and save buttons
    // to save toDo items
    for (var i = 8; i < 18; i++) {
        let plannerTimes = moment(i, 'H').format('HH');
        // console.log(plannerTimes)
        var currentTime = moment().format('HH')
        // console.log(currentTime)
        let plannerTimesToShowUser = moment(i, 'H').format('h a');
        var hourTr = document.createElement("tr")

        // create show hour divs 
        var showHourTd = document.createElement("td")
        showHourTd.classList.add("hourText")
        showHourTd.innerText = plannerTimesToShowUser
        hourTr.appendChild(showHourTd)

        // create todo text area
        var toDoTd = document.createElement("td")
        var toDoTextArea = document.createElement("textarea")
        toDoTextArea.classList.add("form-control")
        // this puts any saved items into the text fields they were saved to
        if (isItSaved == true){
            // console.log(toDoArray[i-8])
            toDoTextArea.innerHTML = toDoArray[i-8]
        }
        toDoTextArea.setAttribute("rows","1")
        toDoTextArea.setAttribute("col","50")
        toDoTd.appendChild(toDoTextArea)
        hourTr.appendChild(toDoTd)

        // show save button
        var saveTd = document.createElement("td")
        var saveButton = document.createElement("button")
        saveButton.innerText = "SAVE"
        saveButton.classList.add("btn")
        saveButton.classList.add("btn-dark")
        saveTd.appendChild(saveButton)
        hourTr.appendChild(saveTd)

        // This puts color classes depending on time of day
        if (plannerTimes == currentTime){
            // console.log("same time")
            hourTr.classList.add("present")
        }
        if (plannerTimes > currentTime){
            hourTr.classList.add("future")
        }
        if (plannerTimes < currentTime){
            hourTr.classList.add("past")
        }
        // console.log(hourTr)
        hourRows.appendChild(hourTr)

    }

    // this is an event listener for all of the save buttons which saves all of the writen items into an array
    document.querySelectorAll('.btn').forEach(item => {
        item.addEventListener('click', event => {
            // console.log(event)
            var everyTextElement = $( ".form-control" )
            // console.log(event)
            // here is where we need to make the information they inputed for ToDo save into the correct hour slot
            for (let i = 0; i < everyTextElement.length; i++) {
                // this sets variable text to the innerHTML of the textarea elements saving items into an array
                var text = everyTextElement[i].value;
                // console.log(text, "is my text")
                toDoArray[i]=text
            } 
            // this clears local storage and saves the new array into local storage so it can be retrieved on reload and inputed into
            // the text array boxes
            window.localStorage.clear("toDoArray")
            // console.log(everyTextElement)
            // console.log(toDoArray)
            isItSaved = true
            window.localStorage.setItem("toDoArray",JSON.stringify(toDoArray))
            window.localStorage.setItem("isItSaved",true)
            toDoArray=[]
        })
      })
}
// this calls startUpFunction when page is loaded
window.onload = startUpFunction





