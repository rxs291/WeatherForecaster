

var cityName = '';
var lon = '';
var lat = ''; 
var titleName = document.querySelector(".cityName")
var searchHistory = document.querySelector("#searchHistory")

var testing = "http://api.openweathermap.org/geo/1.0/direct?q=austin&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27" 
 
var city = '';
var btnSuccess = document.querySelector(".btn");
 
 

btnSuccess.addEventListener("click", successBtnListner)

function successBtnListner(event){ 
    var inputEl = event.target 


    cityName = inputEl.parentElement.previousElementSibling.value

    titleName.textContent = cityName + " " + dayjs().format("(M/DD/YYYY)")
    var newCityName = cityName.replace(/\s/g, '') 

    var apiSearch = "http://api.openweathermap.org/geo/1.0/direct?q=" + newCityName + "&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27"

    searchHist(cityName);
    cityLookup(apiSearch);
 

}



function cityLookup(apiString){

    
fetch(apiString)
.then(function (response) {
  return response.json();
})
.then(function (data) {   
  lon = data[0].lon
  lat =  data[0].lat  

  var newApiSearch = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27"

  fetch(newApiSearch)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {   
    console.log(data)
    console.log(typeof data.list[0].weather[0].main)


    for (var i = 0; i<=40; i+=8){
        var weatherIcon = data.list[i].weather[0].main
        var icon = document.querySelector('#icon' + i)
        var temp = document.querySelector('#temp' + i)
        var wind = document.querySelector('#wind' + i)
        var humidity = document.querySelector('#humidity' + i)
        temp.textContent = "Temp:  " + data.list[i].main.temp + "°F"
        wind.textContent = "Wind: " + data.list[i].wind.speed + "MPH";
        humidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";

        if (weatherIcon === "Clouds"){
             icon.classList.add("fa-solid", "fa-cloud"); 
        } else if (weatherIcon === "Rain") {
            icon.classList.add("fa-solid", "fa-cloud-showers-heavy"); 
        } else {
            icon.classList.add("fa-regular", "fa-sun"); 
        }


    }
  

}
)
}
)
}
  
function todaysDates(){
     
   
    for (var i = 0; i<=32; i+=8){
        var dates = document.querySelector("#date" + i); 
dates.textContent = dayjs().day(i).format("M/DD/YYYY")

    }
}

function searchHist(cityName){

    var li = document.createElement("li");
    var button = document.createElement("button");

    var name = cityName; 

    button.classList.add("btns"); 
    button.classList.add("btn-secondary")
    button.style.width = "310px"
    button.style.border = "solid black"
    li.style.padding = "5px"
    li.style.marginRight = "45px"
    button.type = "button";
    li.textContent = "";
    li.style.listStyleType = "none";
    button.textContent = '' + cityName; 
 
    li.appendChild(button); 
    searchHistory.appendChild(li);
    button.addEventListener("click", historyButtonListner); 
}



function historyButtonListner(event){ 
    var inputEl = event.target.innerText;  


    cityName = inputEl;

    titleName.textContent = cityName + " " + dayjs().format("(M/DD/YYYY)")
    var newCityName = cityName.replace(/\s/g, '') 

    var apiSearch = "http://api.openweathermap.org/geo/1.0/direct?q=" + newCityName + "&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27"
 
    cityLookup(apiSearch); 

}
 
 

todaysDates()





 


 

    // /input city, search
    // //grab city, input it in api to get lon lat
    // /use lon lat to get temperature, wind,humidity
    // output to cards
    // create button to be able to do ut