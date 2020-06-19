// ************************ TODO LIST APP JS CODES BELOW *******************************

// Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input1");
const input2 = document.getElementById("input2");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let LIST, id, data;

// get item from localstorage
// data = localStorage.getItem("TODO");
window.data = localStorage.getItem("TODO");;
console.log(data);
// check if data is not empty
if(data){
    LIST = JSON.parse(window.data);
    console.log(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item) {
        addTodo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function() {
    localStorage.clear();
    localStorage.reload();
})

// Show todays date
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addTodo(toDo, id, done, trash){
    if(trash){ return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `
                <li class="item">
                    <i class="fa fa-circle-thin co" job="complete" id="${id}"></i>
                    <p class="text">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                    `;
    const position = "beforeend";  
    
    list.insertAdjacentHTML(position, item);
    }

        //  add an item to the list user the enter key  
    document.addEventListener("keyup", function(event){
        if(event.keyCode == 13){
            const toDo = input.value;

            //  if the input isn't empty
            if(toDo){
                addTodo(toDo);

                LIST.push({
                    name : toDo,
                    id : id,
                    done : false,
                    trash : false
                });
                
            //  add item to localstorage (this code must be added where the LIST array is updated)
                localStorage.setItem("TODO", JSON.stringify(LIST));

                id++;
            }
            input.value = "";
        }
    });

    //  complete to do
    function completeToDo(element){
        element.classList.toggle(CHECK);
        element.classList.toggle(UNCHECK);
        element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

        LIST[element.id].done ? false : true;
    }

    //  remove to do 
    function removeToDo(element){
        element.parentNode.parentNode.removeChild(element.parentNode);

        LIST[element.id].trash = true;
    }

    //  target the items created dynamically 

    list.addEventListener("click", function(event){
        const element = event.target;
        const elementJob = element.attributes.job.value;

        if(elementJob == "complete"){
            completeToDo(element);
        }else if(elementJob == "delete"){
            removeToDo(element);
        }
        
    //  add item to localstorage (this code must be added where the LIST array is updated)
        localStorage.setItem("TODO", JSON.stringify(LIST));
    });


    // ******************************** WEATHER APP CODES BELOW LIST APP CODES BELOW *****************************************

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//App data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

//Appp CONSTS AND VARS
const KELVIN = 273;
//API KEY 
const key = "55b62d13236501cbf0696d8473f5acb5";

//CHECK IF BROWSER SUPPORTS
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

//SET USER'S POSITION
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}

//GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${key}`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function () {
            displayWeather();
        });
    console.log(api);
}

// Display weather to ui
function displayWeather() {
    iconElement.innerHTML = `<img src="icon/${weather.iconId}.png" />`;
    tempElement.innerHTML = `${weather.temperature.value} &#176;<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// C TO F CONVERSION
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

//  When the user clicks on the temperature element
tempElement.addEventListener("click", function () {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit} &#176;<span>F</span>`;
        weather.temperature.unit = "fahrenheit";

    } else {
        tempElement.innerHTML = `${weather.temperature.value} &#176;<span>C</span>`;
        weather.temperature.unit = "celsius"

    }
});