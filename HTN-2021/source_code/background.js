
let calcButton = document.querySelector("#calcButton");
calcButton.addEventListener('click', test);

function test(){
    console.log("hi button works!")
}

function calc(){
function currentTimeCalculator(UNIX_timestamp){ //UNIX_timestamp = Date.now(); This accounts for your timezone automatically too
    var current_time = new Date(UNIX_timestamp);
    return current_time;
}

function timeDifference(due_date, current_time){ //To accurately measure time until due date
    var date1 = current_time;
    var date2 = new Date(due_date);

    var time_difference = Math.floor((date2 - date1)/1000);

    return time_difference; //This will be in terms of seconds until due date
}

function timeConverter(total_time_sec){ //call this function to convert into days, hours, mins and seconds
    temp = total_time_sec % 86400;
    var date = (total_time_sec-temp) / 86400;
    total_time_sec = total_time_sec - (date * 86400);
    
    temp = total_time_sec % 3600;
    var hour = (total_time_sec - temp) / 3600;
    total_time_sec = total_time_sec - (hour * 3600);
   
    temp = total_time_sec % 60;
    var min = (total_time_sec - temp) / 60;
    total_time_sec = total_time_sec - (min * 60);   
    
    var sec = total_time_sec;
    
    var wordDate = 'days';
    var wordHour = 'hours';
    var wordMin = 'minutes';
    var wordSec = 'seconds';
    if(date < 2){
        wordDate = 'day';
    }
    if(hour < 2){
        wordHour = 'hour';
    }
    if(min < 2){
        wordMin = 'minute';
    }
    if(sec < 2){
        wordSec = 'second';
    }
    return date + " " + wordDate + " " + hour + " " wordHour + " " + min + " " + wordMin + " " + sec + " " + wordSec; 
}

function taskAdder(task_name, due_date, time_difference){
    let temp = {};
    temp.taskName = task_name;
    temp.dueDate = due_date;
    temp.timeDifference = time_difference;
    return temp;
}


//for loop, with if(arr[i] != 'null')
let task_name = ["Math homework", "Chemistry test", "Math assignment", "Physics assignment", "Speech analysis"];
let due_date = ["2021/09/25/14:45:00", "2021/09/31/21:00:00", "2021/09/23/18:00:00", "2021/09/21/23:59:00", "2021/09/19/23:55:00"]; //convert AM and PM to 24 hour clock
let urgency_list = [{timeDifference: 999999999}]; 

if(task_name.length == due_date.length){ //if statement checks if the 2 lists are equal, otherwise we get runtime error
    for(let i = 0; i < due_date.length; i++){
        let task = taskAdder(task_name[i], due_date[i], timeDifference(due_date[i], currentTimeCalculator(Date.now())));
        if(urgency_list.length < 2){
            urgency_list.unshift(task);
        }
        else{
            if(task.timeDifference < urgency_list[0].timeDifference){
                urgency_list.unshift(task);
            }
            else{
                for(let j = 0; j < urgency_list.length; j++){
                    if(task.timeDifference > urgency_list[j].timeDifference){
                        urgency_list.splice(j-1, 0, task); 
                        if(task.timeDifference < urgency_list[j+1].timeDifference && task.timeDifference > urgency_list[j].timeDifference){
                        urgency_list.splice(j, 0, task);
                        break;
                        }
                        break;
                    }
                }
            }
        }
    }  
}

else{
    console.log('Uneven list lengths')
}
}

chrome.runtime.onInstalled.addListener((reason) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: 'webpage.html'
        });
        
    }
});

var reminderArr = ["date","blah blah", "time"];

let globalValues = {
    eventName: [],
    date: [],
    time: []
};

chrome.storage.sync.set(globalValues, function() {
    console.log('Value is set to ' + globalValues);
});

function extractGlobals() {
    chrome.storage.sync.get(['globalValues'], function(result) {
        console.log('The values are ' + JSON.stringify(globalValues));
    })
}

/*
chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log("Alarm Fired");
    chrome.storage.sync.get(['reminderObj'], function(result) {
        console.log('Value currently is ' + result.reminderObj);
        alert(result.reminderObj);
        });
})

*/
