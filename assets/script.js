

var cityName = '';
var lon = '';
var lat = ''; 
var titleName = document.querySelector(".cityName")
var searchHistory = document.querySelector("#searchHistory")

var testing = "http://api.openweathermap.org/geo/1.0/direct?q=austin&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27" 
 
var city = '';
var btnSuccess = document.querySelector(".btn-success");

console.log(btnSuccess.nextElementSibling)
 

btnSuccess.addEventListener("click", successBtnListner)

function successBtnListner(event){ 
    var inputEl = event.target 


    cityName = inputEl.parentElement.previousElementSibling.value

    titleName.textContent = cityName + " " + dayjs().format("(M/DD/YYYY)")
    var newCityName = cityName.replace(/\s/g, '') 

    var apiSearch = "http://api.openweathermap.org/geo/1.0/direct?q=" + newCityName + "&limit=1&appid=31fbadef98a417ef6f0e39d36c133d27"

    cityLookup(apiSearch);
    searchHist(cityName);

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

    for (var i = 0; i<=5; i++){
        var temp = document.querySelector('#temp' + i)
        var wind = document.querySelector('#wind' + i)
        var humidity = document.querySelector('#humidity' + i)
        temp.textContent = "Temp:  " + data.list[i].main.temp + "°F"
        wind.textContent = "Wind: " + data.list[i].wind.speed + "MPH";
        humidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";

    }
  

}
)
}
)
}
  
function todaysDates(){
     
   
    for (var i = 0; i<=5; i++){
        var dates = document.querySelector("#date" + i); 
dates.textContent = dayjs().day(i).format("M/DD/YYYY")

    }
}

function searchHist(cityName){

    var li = document.createElement("li");
    var button = document.createElement("button");

    button.classList.add("btns"); 
    button.textContent = '' + cityName;
 
    li.appendChild(button); 
    searchHistory.appendChild(li);
    // button.addEventListener("click", btnsEventListner);
}
 
 

todaysDates()

 



 


 

    // /input city, search
    // //grab city, input it in api to get lon lat
    // /use lon lat to get temperature, wind,humidity
    // output to cards
    // create button to be able to do ut