// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// OUR APPLICATION DATA
const weather = {};

weather.temperature = {
    unit : "celsius"
};

// APP CONSTANTS AND VARS
const KELVIN = 273;

// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

// CHECK IF BROWSER SUPPORT GEOLOCATION and GET LOCATION
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
    
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>";
}

// SET POSITION
function setPosition(position){
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// GET WEATHER FROM API
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
            
        }).then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN); // Celsius
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        }).then(function(){
            displayWeather();
        });
}

// SHOW ERROR
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// toggle fahrenheit ans celcius
tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    if(weather.temperature.unit === "celsius"){
        
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
        weather.temperature.unit = "fahrenheit"
    }else{
        tempElement.innerHTML = `${weather.temperature.value}° <span>F</span>`;
        weather.temperature.unit = "celsius"
    }
});

// display weather info to ui
function displayWeather(){
    
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// °C to °F conversion 
function celsiusToFahrenheit(temperature){
    // (0 °C × 9/5) + 32 = 32 °F
    return (temperature * 9/5) + 32;
}







