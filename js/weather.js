/*======================================================
    SMART TRAVEL PLANNER
    weather.js (Professional Version)
======================================================*/

const WEATHER_API_KEY = "5a55510d522b15a140c70d85072d6788";

const WEATHER_URL =
"https://api.openweathermap.org/data/2.5/weather";

//=====================================
// Fetch Weather
//=====================================

async function updateWeather(city){

    if(!city){

        showError("Please select a destination.");

        return;

    }

    const url=

`${WEATHER_URL}?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`;

    try{

        loadingWeather();

        const response=await fetch(url);

        if(!response.ok){

            throw new Error("Unable to fetch weather.");

        }

        const data=await response.json();

        displayWeather(data);

    }

    catch(error){

        console.error(error);

        showError("Weather data unavailable.");

    }

}

//=====================================
// Display Weather
//=====================================

function displayWeather(data){

    document.getElementById("cityName").textContent=data.name;

    document.getElementById("temperature").textContent=

    Math.round(data.main.temp)+"°C";

    const icon=data.weather[0].icon;

    const iconURL=

`https://openweathermap.org/img/wn/${icon}@2x.png`;

    document.getElementById("weatherStatus").innerHTML=`

        <img src="${iconURL}" width="90">

        <h3>${capitalize(data.weather[0].description)}</h3>

        <p>

        🌡 Temperature :
        ${Math.round(data.main.temp)}°C

        </p>

        <p>

        🤗 Feels Like :
        ${Math.round(data.main.feels_like)}°C

        </p>

        <p>

        💧 Humidity :
        ${data.main.humidity}%

        </p>

        <p>

        🌬 Wind Speed :
        ${data.wind.speed} m/s

        </p>

        <p>

        ☁ Cloud Cover :
        ${data.clouds.all}%

        </p>

        <p>

        📊 Pressure :
        ${data.main.pressure} hPa

        </p>

    `;

}

//=====================================
// Loading
//=====================================

function loadingWeather(){

    document.getElementById("cityName").textContent="Loading...";

    document.getElementById("temperature").textContent="--°C";

    document.getElementById("weatherStatus").innerHTML=

    "<p>Fetching live weather...</p>";

}

//=====================================
// Error
//=====================================

function showError(message){

    document.getElementById("cityName").textContent="Weather";

    document.getElementById("temperature").textContent="--°C";

    document.getElementById("weatherStatus").innerHTML=

    `<p>${message}</p>`;

}

//=====================================
// Capitalize
//=====================================

function capitalize(text){

    return text.charAt(0).toUpperCase()+text.slice(1);

}

//=====================================
// Refresh
//=====================================

function refreshWeather(){

    if(typeof trip!=="undefined" && trip.destination){

        updateWeather(trip.destination);

    }

}

// Refresh every 10 minutes

setInterval(refreshWeather,600000);