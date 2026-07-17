/*======================================================
    SMART TRAVEL PLANNER
    theme.js
======================================================*/

//======================================
// Theme Constants
//======================================

const THEME_STORAGE_KEY = "travelPlannerTheme";

const themeButton = document.getElementById("themeBtn");

//======================================
// Initialize Theme
//======================================

function initializeTheme(){

    const savedTheme =
        localStorage.getItem(THEME_STORAGE_KEY);

    if(savedTheme === "dark"){

        document.body.classList.add("dark");

        updateThemeIcon(true);

    }else{

        document.body.classList.remove("dark");

        updateThemeIcon(false);

    }

}

//======================================
// Toggle Theme
//======================================

function toggleTheme(){

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    if(isDark){

        localStorage.setItem(
            THEME_STORAGE_KEY,
            "dark"
        );

    }else{

        localStorage.setItem(
            THEME_STORAGE_KEY,
            "light"
        );

    }

    updateThemeIcon(isDark);

}

//======================================
// Change Button Icon
//======================================

function updateThemeIcon(isDark){

    if(!themeButton) return;

    if(isDark){

        themeButton.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }else{

        themeButton.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

    }

}

//======================================
// Button Click Event
//======================================

if(themeButton){

    themeButton.addEventListener(
        "click",
        toggleTheme
    );

}

//======================================
// Auto Initialize
//======================================

initializeTheme();