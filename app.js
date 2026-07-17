/*======================================================
    SMART TRAVEL PLANNER
    app.js (Professional Version)
======================================================*/

//==============================
// DOM Elements
//==============================

const tripForm = document.getElementById("tripForm");
const result = document.getElementById("result");

const destinationInput = document.getElementById("destination");
const daysInput = document.getElementById("days");
const budgetInput = document.getElementById("budget");
const peopleInput = document.getElementById("people");
const transportInput = document.getElementById("transport");
const hotelInput = document.getElementById("hotel");
const foodInput = document.getElementById("food");
const tripTypeInput = document.getElementById("tripType");

//==============================
// Global Trip Object
//==============================

let trip = {};

//==============================
// Start Application
//==============================

document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();

    loadSavedTrips();

    initializeLoader();

    initializeExploreButtons();

});

//==============================
// Loader
//==============================

function initializeLoader(){

    const loader=document.getElementById("loader");

    if(!loader) return;

    setTimeout(()=>{

        loader.classList.add("hide");

    },1500);

}

//==============================
// Form Submit
//==============================

tripForm.addEventListener("submit",createTrip);

//==============================
// Create Trip
//==============================

function createTrip(e){

    e.preventDefault();

    const destination=destinationInput.value.trim();

    const days=Number(daysInput.value);

    const budget=Number(budgetInput.value);

    const people=Number(peopleInput.value);

    const transport=transportInput.value;

    const hotel=hotelInput.value;

    const food=foodInput.value;

    const tripType=tripTypeInput.value;

    if(destination===""){

        alert("Please enter destination.");

        return;

    }

    if(days<1){

        alert("Enter valid number of days.");

        return;

    }

    if(budget<=0){

        alert("Enter valid budget.");

        return;

    }

    trip={

        destination,

        days,

        budget,

        people,

        transport,

        hotel,

        food,

        tripType,

        createdAt:new Date().toLocaleString()

    };

    generateTravelPlan(trip);

}

//==============================
// Generate Travel Plan
//==============================

function generateTravelPlan(data){

    result.style.display="block";

    result.innerHTML=`

        <div class="generated-card">

            <h2>Trip Successfully Generated</h2>

            <hr>

            <p><strong>Destination :</strong> ${data.destination}</p>

            <p><strong>Duration :</strong> ${data.days} Days</p>

            <p><strong>Budget :</strong> ₹${data.budget}</p>

            <p><strong>Travellers :</strong> ${data.people}</p>

            <p><strong>Transport :</strong> ${data.transport}</p>

            <p><strong>Hotel :</strong> ${data.hotel}</p>

            <p><strong>Food :</strong> ${data.food}</p>

            <p><strong>Trip Type :</strong> ${data.tripType}</p>

            <p><strong>Generated :</strong> ${data.createdAt}</p>

        </div>

    `;

    calculateBudget(data);

    generateItinerary(data);

    saveTrip(data);

    updateWeather(data.destination);

    loadMap(data.destination);

    updateDestinationDetails(data.destination);

    scrollToResult();

}

//==============================
// Scroll
//==============================

function scrollToResult(){

    result.scrollIntoView({

        behavior:"smooth"

    });

}

//==============================
// Explore Buttons
//==============================

function initializeExploreButtons(){

    const buttons=document.querySelectorAll(".explore-btn");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            const place=button.dataset.place;

            updateDestinationDetails(place);

        });

    });

}

//==============================
// Destination Information
//==============================

function updateDestinationDetails(place){

    const destinations={

        Goa:{
            time:"October - March",
            budget:"₹12,000 - ₹20,000",
            days:"4 - 5 Days",
            desc:"Famous for beaches, nightlife and water sports."
        },

        Manali:{
            time:"November - February",
            budget:"₹15,000 - ₹25,000",
            days:"5 Days",
            desc:"Snow mountains and adventure destination."
        },

        Ooty:{
            time:"Throughout the Year",
            budget:"₹10,000 - ₹18,000",
            days:"3 Days",
            desc:"Tea gardens and beautiful hill station."
        },

        Kerala:{
            time:"September - March",
            budget:"₹14,000 - ₹22,000",
            days:"5 Days",
            desc:"Backwaters, houseboats and nature."
        },

        Jaipur:{
            time:"October - March",
            budget:"₹11,000 - ₹18,000",
            days:"3 Days",
            desc:"Historic forts and royal palaces."
        },

        Kashmir:{
            time:"April - October",
            budget:"₹18,000 - ₹30,000",
            days:"6 Days",
            desc:"Known as Paradise on Earth."
        }

    };

    const info=destinations[place];

    if(!info) return;

    document.getElementById("destinationTitle").textContent=place;
    document.getElementById("destinationDescription").textContent=info.desc;
    document.getElementById("bestTime").textContent=info.time;
    document.getElementById("estimatedBudget").textContent=info.budget;
    document.getElementById("recommendedDays").textContent=info.days;

    loadMap(place);

    updateWeather(place);

}