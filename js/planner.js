/*======================================================
    SMART TRAVEL PLANNER
    planner.js (Professional Version)
======================================================*/

//===================================
// Budget Calculation
//===================================

function calculateBudget(trip){

    const hotelBudget=Math.round(trip.budget*0.40);

    const foodBudget=Math.round(trip.budget*0.25);

    const transportBudget=Math.round(trip.budget*0.20);

    const activityBudget=Math.round(trip.budget*0.15);

    document.getElementById("hotelBudget").textContent="₹"+hotelBudget;

    document.getElementById("foodBudget").textContent="₹"+foodBudget;

    document.getElementById("transportBudget").textContent="₹"+transportBudget;

    document.getElementById("activityBudget").textContent="₹"+activityBudget;

}

//===================================
// AI Travel Itinerary
//===================================

function generateItinerary(trip){

    const container=document.getElementById("itineraryContainer");

    if(!container) return;

    container.innerHTML="";

    for(let day=1;day<=trip.days;day++){

        const card=document.createElement("div");

        card.className="day-card";

        card.innerHTML=`

        <h3>

        <i class="fa-solid fa-calendar-day"></i>

        Day ${day}

        </h3>

        <ul>

        <li><strong>Morning :</strong> ${morningActivity(trip.tripType)}</li>

        <li><strong>Afternoon :</strong> ${afternoonActivity(trip.tripType)}</li>

        <li><strong>Evening :</strong> ${eveningActivity(trip.tripType)}</li>

        <li><strong>Dinner :</strong> Local Traditional Cuisine</li>

        </ul>

        `;

        container.appendChild(card);

    }

    generateTripSummary(trip);

}

//===================================
// Morning
//===================================

function morningActivity(type){

    switch(type){

        case "Solo":

            return "Explore famous attractions";

        case "Family":

            return "Family sightseeing";

        case "Friends":

            return "Adventure activities";

        case "Couple":

            return "Romantic breakfast and sightseeing";

        default:

            return "City exploration";

    }

}

//===================================
// Afternoon
//===================================

function afternoonActivity(type){

    switch(type){

        case "Solo":

            return "Museum visit & local food";

        case "Family":

            return "Theme park and shopping";

        case "Friends":

            return "Water sports / Trekking";

        case "Couple":

            return "Scenic lunch with photography";

        default:

            return "Local sightseeing";

    }

}

//===================================
// Evening
//===================================

function eveningActivity(type){

    switch(type){

        case "Solo":

            return "Sunset viewpoint";

        case "Family":

            return "Family dinner";

        case "Friends":

            return "Night market exploration";

        case "Couple":

            return "Candlelight dinner";

        default:

            return "Relax at hotel";

    }

}

//===================================
// Trip Summary
//===================================

function generateTripSummary(trip){

    const result=document.getElementById("result");

    if(!result) return;

    const hotel=suggestHotel(trip.hotel);

    const personCost=costPerPerson(trip.budget,trip.people);

    result.innerHTML+=`

    <hr>

    <h3>

    Trip Analysis

    </h3>

    <p>

    🏨 Recommended Hotel :

    <strong>${hotel}</strong>

    </p>

    <p>

    💰 Cost Per Person :

    <strong>₹${personCost}</strong>

    </p>

    <p>

    🚗 Estimated Transport Cost :

    <strong>₹${transportCost(trip.transport)}</strong>

    </p>

    <p>

    ⭐ Travel Recommendation :

    Start your journey early morning to maximize sightseeing.

    </p>

    <p>

    ✔ AI Planner Status :

    Travel Plan Successfully Generated

    </p>

    `;

}

//===================================
// Hotel Suggestion
//===================================

function suggestHotel(type){

    switch(type){

        case "Budget":

            return "Budget Inn";

        case "Standard":

            return "Comfort Residency";

        case "Luxury":

            return "Premium Grand Resort";

        default:

            return "Budget Inn";

    }

}

//===================================
// Transport Cost
//===================================

function transportCost(mode){

    switch(mode){

        case "Bus":

            return 1000;

        case "Train":

            return 2500;

        case "Car":

            return 3500;

        case "Flight":

            return 7000;

        default:

            return 0;

    }

}

//===================================
// Cost Per Person
//===================================

function costPerPerson(total,people){

    if(people<=0) return total;

    return Math.round(total/people);

}