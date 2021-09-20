//Creating necessary variables for reminders feature
let reminderArr = [];


function addReminder() {
    reminderArr.push("Event at set Time");
}

chrome.storage.sync.get(['reminderObj'], function(result) {
    console.log('Value currently is ' + result.reminderObj);
});

//Opening up Scheduling html page using webBtn id
var webButton = document.getElementById("webBtn");
webButton.onclick = function openWeb() 
{
    chrome.tabs.create({url: 'webpage.html'}, console.log("attempted html page open"));
}

//Setting up a temporary button for testing alerts

var alertButton = document.getElementById("alertBtn");
alertButton.onclick = function showAlerts()
{
    chrome.storage.sync.get(['reminderObj'], function(result) {
    console.log('Value currently is ' + result.reminderObj);
    alert(result.reminderObj);
    });
}

//Setting an alarm as soon as the popup script runs

var alarmInfo = {
    delayInMinutes: 1
};
chrome.alarms.create("firstTask", alarmInfo);
console.log("alarm is set to " + alarmInfo);