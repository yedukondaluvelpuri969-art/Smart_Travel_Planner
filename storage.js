/*======================================================
    SMART TRAVEL PLANNER
    storage.js (Professional Version)
======================================================*/

const STORAGE_KEY = "smartTravelPlannerTrips";

//=====================================
// Save Trip
//=====================================

function saveTrip(trip){

    let trips = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    trips.unshift(trip);

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(trips)
    );

    displaySavedTrips();

}

//=====================================
// Load Trips
//=====================================

function loadSavedTrips(){

    displaySavedTrips();

}

//=====================================
// Display Trips
//=====================================

function displaySavedTrips(){

    const container=document.getElementById("savedTripsContainer");

    if(!container) return;

    const trips=JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if(trips.length===0){

        container.innerHTML=`

        <div class="saved-trip-card">

            <h3>No Saved Trips</h3>

            <p>

            Generate your first travel plan.

            </p>

        </div>

        `;

        return;

    }

    container.innerHTML="";

    trips.forEach((trip,index)=>{

        const card=document.createElement("div");

        card.className="saved-trip-card";

        card.innerHTML=`

        <h3>

        📍 ${trip.destination}

        </h3>

        <p>

        📅 <strong>${trip.days}</strong> Days

        </p>

        <p>

        💰 ₹${trip.budget}

        </p>

        <p>

        👨‍👩‍👧 ${trip.people} Traveller(s)

        </p>

        <p>

        🚗 ${trip.transport}

        </p>

        <p>

        🏨 ${trip.hotel}

        </p>

        <p>

        🍽 ${trip.food}

        </p>

        <p>

        ❤️ ${trip.tripType}

        </p>

        <p>

        🕒 ${trip.createdAt}

        </p>

        <button onclick="viewTrip('${trip.destination}')">

        View Details

        </button>

        <button onclick="deleteTrip(${index})">

        Delete

        </button>

        `;

        container.appendChild(card);

    });

}

//=====================================
// View Trip Again
//=====================================

function viewTrip(destination){

    updateDestinationDetails(destination);

    updateWeather(destination);

    loadMap(destination);

    document.getElementById("destinationDetails")
    ?.scrollIntoView({

        behavior:"smooth"

    });

}

//=====================================
// Delete One
//=====================================

function deleteTrip(index){

    let trips=JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if(confirm("Delete this saved trip?")){

        trips.splice(index,1);

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(trips)

        );

        displaySavedTrips();

    }

}

//=====================================
// Delete All
//=====================================

function clearAllTrips(){

    if(confirm("Delete all saved trips?")){

        localStorage.removeItem(STORAGE_KEY);

        displaySavedTrips();

    }

}

//=====================================
// Search
//=====================================

function searchTrip(destination){

    let trips=JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    return trips.filter(trip=>{

        return trip.destination

        .toLowerCase()

        .includes(destination.toLowerCase());

    });

}

//=====================================
// Export
//=====================================

function exportTrips(){

    const trips=JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    if(trips.length===0){

        alert("No saved trips available.");

        return;

    }

    const blob=new Blob(

        [JSON.stringify(trips,null,2)],

        {type:"application/json"}

    );

    const url=URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="SmartTravelPlannerTrips.json";

    a.click();

    URL.revokeObjectURL(url);

}

//=====================================
// Button
//=====================================

document.addEventListener("DOMContentLoaded",()=>{

    const view=document.getElementById("viewTrips");

    if(view){

        view.addEventListener("click",displaySavedTrips);

    }

});