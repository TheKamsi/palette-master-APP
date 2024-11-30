import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://palette-master-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const refInDB = ref(database, "palettes")

const coolNameEl = document.getElementById("cool-name-el")
const hexCodeEl = document.getElementById("hex-code-el")
const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

saveBtn.addEventListener("click", saveHexCode)
deleteBtn.addEventListener("dblclick", deleteHexCode)

onValue(refInDB,function(snapshot){
    const isSnapshotAvailable = snapshot.exists()
    if(isSnapshotAvailable){
        const snapshotValues = snapshot.val()
        const hexCodeInputs = Object.values(snapshotValues)
        renderHexCode(hexCodeInputs)
    }
})

function saveHexCode(){
    let coolNameValue = coolNameEl.value
    let hexCodeValue = hexCodeEl.value

    const userInputObject = {
        name: coolNameValue,
        hexCode: hexCodeValue
    };

    if(coolNameValue && hexCodeValue){
        push(refInDB, userInputObject)
        coolNameEl.value = ""
        hexCodeEl.value = ""
    } else if(!coolNameValue || !hexCodeValue){
        alert("Name or hex code is missing")
    }
}

function deleteHexCode(){
    alert("Are you sure you want to delete the hexcodes?")
    remove(refInDB)
    ulEl.innerHTML = ""
}

function renderHexCode(hexcodeObject){
    let listOfHexCodes = ""
    for(let i = 0; i < hexcodeObject.length; i++){
        listOfHexCodes += 
        `
        <li>
            <label>${hexcodeObject[i].name}</label>
            <a style="background-color: ${hexcodeObject[i].hexCode};">${hexcodeObject[i].hexCode}</a>
        </li>
        `
    }
    ulEl.innerHTML = listOfHexCodes
}