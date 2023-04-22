document.addEventListener("DOMContentLoaded", function () {
  var cityName = "";
  var lon = "";
  var lat = "";
  var titleName = document.querySelector(".cityName");
  var searchHistory = document.querySelector("#searchHistory");
  var error = document.querySelector("#error");
  var city = "";
  var btnSuccess = document.querySelector(".btn");
  var btnClear = document.querySelector("#clear");
  var cities = []; 

  btnSuccess.addEventListener("click", searchBtnListner);
  btnClear.addEventListener("click", clearHistory);

  //////THIS EVENT LISTNER GRABS THE USER INPUT, REMOVES ALL SPACING, AND THEN ATTACHES THE NAME OF THE CITY TO THE "CIT NAME API SEARCH"
  function searchBtnListner(event) {
    var inputEl = event.target;
    cityName = inputEl.parentElement.previousElementSibling.value;
    var newCityName = cityName.trim();
    newCityName = newCityName.replace(" ", "_")

    var apiSearch =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      newCityName +
      "&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27";

    cityLookup(apiSearch);
  }

  /////THIS FUNCTION STARTS BY USING THE "CITY NAME API" TO GRAB THE  LONGITUDE AND LATTITUDE, THEN MAKES A NEW API SEARCH WITH THAT INFORMATION TO PULL THE WEATHER
  function cityLookup(apiString) {
    fetch(apiString)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        /////IF THERE IS NO DATA RETURNED ON THE LONGITUDE/LATTITUDE SEARCH, WE CATCH THAT BY CHECKING LENGTH AND GIVING A RESPONSE SAYING SO. IF INFORMATION IS FOUND, THE FUNCTION CONTINUES.
        if (data.length === 0) {
          error.textContent = "*City Not Found";
          throw new Error("JSON response empty.");
        } else {

        }

        lon = data[0].lon;
        lat = data[0].lat;

        var newApiSearch =
          "http://api.openweathermap.org/data/2.5/forecast?lat=" +
          lat +
          "&lon=" +
          lon +
          "&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27&units=imperial";

        fetch(newApiSearch)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            error.textContent = "";
            var cityName = data.city.name;
            titleName.textContent =
              cityName + " " + dayjs().format("(M/DD/YYYY)");

            searchHist(cityName);

            for (var i = 3; i <= 35; i += 8) {
              var weatherIcon = data.list[i].weather[0].main;
              var icon = document.querySelector("#icon" + i);
              var temp = document.querySelector("#temp" + i);
              var wind = document.querySelector("#wind" + i);
              var humidity = document.querySelector("#humidity" + i);
              temp.textContent = "Temp:  " + data.list[i].main.temp + "°F";
              wind.textContent = "Wind: " + data.list[i].wind.speed + "MPH";
              humidity.textContent =
                "Humidity: " + data.list[i].main.humidity + "%";

              if (weatherIcon === "Clouds") {
                icon.classList.add("fa-solid", "fa-cloud");
              } else if (weatherIcon === "Rain") {
                icon.classList.add("fa-solid", "fa-cloud-showers-heavy");
              } else {
                icon.classList.add("fa-regular", "fa-sun");
              }
            }
          });
      });
  }

  //////THIS FUNCTION ADDS DATES TO THE CARD CONTAINERS 
  function todaysDates() {
    for (var i = 0; i <= 4; i++) {
      var dates = document.querySelector("#date" + i);
      dates.textContent = dayjs().add(i, "d").format("M/DD/YYYY");
    }
  }

  ///////THIS FUNCTION CHECKS TO SEE IF THE CITY HAS BEEN CALLED, THEN IF NOT,  ADDS THE CITY THAT WAS JUST SEARCHED INTO THE SEARCH HISTORY CONTAINER FOR FUTURE USE AND STORES IN TO LOCAL STORAGE
  function searchHist(cityName) {
    var name = cityName;

    if (cities.includes(name)) {
      console.log("this works");
    } else {
      cities.push(name);
      localStorage.setItem("Cities", JSON.stringify(cities));
      renderHistory(name);
    }
  }

  ///THIS FUNCTION GRABS THE INNERTEXT FROM THE BUTTON OF THE CLICKED ON BUTTON AND RECYCLES IT THROUGH THE CITYLOOKUP FUNCTION TO RE-DISPLAY TO SCREEN

  function historyButtonListner(event) {
    var inputEl = event.target.innerText;

    cityName = inputEl;

    titleName.textContent = cityName + " " + dayjs().format("(M/DD/YYYY)");
    var newCityName = cityName.replace(/\s/g, "");

    var apiSearch =
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
      newCityName +
      "&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27";

    cityLookup(apiSearch);
  }

  ///THIS FUNCTION RENDERS ON PAGE LOAD, IT GRABS AND PARSES THE CITIES OBJECT, CHECKS FOR STORED CITIES, THEN LOOPS THROUGH AND SENDS EACH CITY IN IT TO THE "RENDERHISTORY" FUNCTION
  function init() {
    var storedCities = JSON.parse(localStorage.getItem("Cities")) || [];
    if (storedCities !== null) {
      cities = storedCities;
      for (var i = 0; i < cities.length; i++) {
        renderHistory(cities[i]);
      }
    }
  }


  ////THIS FUNCTION CREATES A BUTTON AND ATTACHES TO THE HISTORY CONTAINER FOR EVERY CITY NAME THAT IS PASSED TO IT. 
  function renderHistory(name) {
    var cityName = name;
    var li = document.createElement("li");
    var button = document.createElement("button");

    button.classList.add("btns");
    button.classList.add("btn-secondary");
    button.style.width = "310px";
    button.style.border = "solid black";
    li.style.padding = "5px";
    li.style.marginRight = "45px";
    button.type = "button";
    li.textContent = "";
    li.style.listStyleType = "none";
    button.textContent = "" + cityName;

    li.appendChild(button);
    searchHistory.appendChild(li);
    button.addEventListener("click", historyButtonListner);
  }


  ///THESE FUNCTIONS RENDER ON PAGE LOAD, ONE TO ESTABLISH THE DATES AND THE OTHER TO PULL FROM LOCALSTORAGE AND RENDER PREVIOUS SEARCH HISTORY
  todaysDates();
  init();

  function clearHistory(){
    localStorage.clear()
    searchHistory.innerHTML = "";

  }
});
