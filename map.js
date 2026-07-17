/*======================================================
    SMART TRAVEL PLANNER
    map.js (Professional Version)
======================================================*/

//=====================================
// Current Selected Destination
//=====================================

let currentDestination = "";

//=====================================
// Load Google Map
//=====================================

function loadMap(destination){

    currentDestination = destination;

    const map=document.getElementById("googleMap");

    if(!map) return;

    if(destination.trim()===""){

        map.innerHTML="<h3>Please select a destination.</h3>";

        return;

    }

    const url=
`https://www.google.com/maps?q=${encodeURIComponent(destination)}&output=embed`;

    map.innerHTML=`

    <iframe

    src="${url}"

    width="100%"

    height="450"

    style="border:0;border-radius:15px;"

    loading="lazy"

    allowfullscreen>

    </iframe>

    `;

}

//=====================================
// Open Google Maps
//=====================================

function openInGoogleMaps(){

    if(currentDestination===""){

        alert("Select a destination first.");

        return;

    }

    window.open(

`https://www.google.com/maps/search/${encodeURIComponent(currentDestination)}`,

"_blank"

    );

}

//=====================================
// Open Google Reviews
//=====================================

function openGoogleReviews(){

    if(currentDestination===""){

        alert("Select a destination first.");

        return;

    }

    window.open(

`https://www.google.com/search?q=${encodeURIComponent(currentDestination+" reviews")}`,

"_blank"

    );

}

//=====================================
// Watch Travel Guide
//=====================================

function watchTravelGuide(){

    if(currentDestination===""){

        alert("Select a destination first.");

        return;

    }

    window.open(

`https://www.youtube.com/results?search_query=${encodeURIComponent(currentDestination+" travel guide")}`,

"_blank"

    );

}

//=====================================
// Button Events
//=====================================

document.addEventListener("DOMContentLoaded",()=>{

    const videoBtn=document.getElementById("watchVideoBtn");

    const reviewBtn=document.getElementById("googleReviewBtn");

    const mapBtn=document.getElementById("mapBtn");

    const quickVideo=document.getElementById("travelGuideBtn");

    const quickReview=document.getElementById("reviewBtn");

    const quickDirection=document.getElementById("directionBtn");

    if(videoBtn){

        videoBtn.addEventListener("click",watchTravelGuide);

    }

    if(reviewBtn){

        reviewBtn.addEventListener("click",openGoogleReviews);

    }

    if(mapBtn){

        mapBtn.addEventListener("click",openInGoogleMaps);

    }

    if(quickVideo){

        quickVideo.addEventListener("click",watchTravelGuide);

    }

    if(quickReview){

        quickReview.addEventListener("click",openGoogleReviews);

    }

    if(quickDirection){

        quickDirection.addEventListener("click",openInGoogleMaps);

    }

});