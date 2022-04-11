// create a list el at the bottom of the search form
var historyList = document.querySelector(".past-searches");
var searchBtn = document.querySelector("#search-btn");
var searchInput = document.querySelector("#search-input");
var pastSearches = [];

// variables storing api key, city, lattitude and longitude, to be used inside url being fetched
// city, lat and lon, can later become dynamically assinged based on user search input
var city = "San Diego";
var apiKey = "ca40b1278d336ed063babe6c19e2f143";
var lat;
var lon;
var currentTempEl = document.querySelector("#current-temp");
var currentWindEl = document.querySelector("#current-wind");
var currentHumidityEl = document.querySelector("#current-humidity");
var currentUvEl = document.querySelector("#current-uv");

var icon;

// variables selecting HTML elements for rendering daily weather data
// daily temp elements
var dayOneTempEl = document.querySelector("#day-1-temp");
var dayTwoTempEl = document.querySelector("#day-2-temp");
var dayThreeTempEl = document.querySelector("#day-3-temp");
var dayFourTempEl = document.querySelector("#day-4-temp");
var dayFiveTempEl = document.querySelector("#day-5-temp");

//daily wind elements
var dayOneWindEl = document.querySelector("#day-1-wind");
var dayTwoWindEl = document.querySelector("#day-2-wind");
var dayThreeWindEl = document.querySelector("#day-3-wind");
var dayFourWindEl = document.querySelector("#day-4-wind");
var dayFiveWindEl = document.querySelector("#day-5-wind");

// daily humididty elements
var dayOneHumidityEl = document.querySelector("#day-1-humidity");
var dayTwoHumidityEl = document.querySelector("#day-2-humidity");
var dayThreeHumidityEl = document.querySelector("#day-3-humidity");
var dayFourHumidityEl = document.querySelector("#day-4-humidity");
var dayFiveHumidityEl = document.querySelector("#day-5-humidity");

// exclude uncessary data like hourly, munitely, alerts. Make sure daily is not excluded. units = imperial make temp in farrenheit, wind mph.
// var exampleOneCallApi =
//   "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//   "32" +
//   "&lon=" +
//   "-117" +
//   ".04&exclude=hourly,minutely,alerts&units=imperial&appid=" +
//   apiKey;

// // to get lat and long of a city
// var exampleGeolocationApi =
//   "http://api.openweathermap.org/geo/1.0/direct?q=" +
//   city +
//   "&limit=5&appid=" +
//   apiKey;

function getLatLon(city, apiKey) {
var requestUrl =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  city +
  "&limit=5&appid=" +
  apiKey;
  fetch(requestUrl)
    .then(function (response) {
      console.log(requestUrl);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    //   console.log("lattitude: " + data[0].lat + " longitude: " + data[0].lon);
      var lat = data[0].lat;
      console.log(lat)
      var lon = data[0].lon;
      console.log(lon)
        FiveDayForecast(lat, lon)
    });
}

 getLatLon(city, apiKey);

function FiveDayForecast(lat, lon) {
    var OneCallUrl =
  "https://api.openweathermap.org/data/2.5/onecall?lat=" +
  lat +
  "&lon=" +
  lon +
  "&exclude=hourly,minutely,alerts&units=imperial&appid=" +
  apiKey;
  fetch(OneCallUrl)
    .then(function (response) {
      console.log(OneCallUrl);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //  CURRENT weather
      var currentTemp = data.current.temp;
      currentTempEl.textContent = "Temp: " + currentTemp + "°F";
      var currentWind = data.current.wind_speed;
      currentWindEl.textContent = "Wind: " + currentWind + " MPH";
      var currentHumidity = data.current.humidity;
      currentHumidityEl.textContent = "Humidity: " + currentHumidity + " %";
      var currentUV = data.current.uvi;
      //  Setting the current uv index display color to change under different conditions
      currentUvEl.innerHTML =
        "UV Index: " + '<button id = "uv-btn">' + currentUV + "</button>";
      var uvStatus = document.querySelector("#uv-btn");
      uvStatus.setAttribute("style", "color: white; border-radius: 10px");
      if (currentUV < 2) {
        uvStatus.style.backgroundColor = "green";
      } else if (currentUV < 5) {
        uvStatus.style.backgroundColor = "brown";
      } else {
        uvStatus.style.backgroundColor = "red";
      }

      // DAY-1 weather
      // icon assigned to daily weather div's src att url which includes open weather icon code for that day's weather
      var dayOneImgEl = document.querySelector("#day-1-icon");
      var dayOneIcon = data.daily[1].weather[0].icon;
      dayOneImgEl.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + dayOneIcon + "@2x.png"
      );

      // getting daily temp from data object and rendering it on page
      var day1Temp = data.daily[1].temp.day;
      dayOneTempEl.textContent = "Temp: " + day1Temp + "°F";

      // getting daily wind from data object and rendering it on page
      var day1Wind = data.daily[1].wind_speed;
      dayOneWindEl.textContent = "Wind: " + day1Wind + " MPH";

      // getting daily humidity from data object and rendering it on page
      var day1Humidity = data.daily[1].humidity;
      dayOneHumidityEl.textContent = "Humidity: " + day1Humidity + "%";

      // DAY-2 weather
      // icon assigned to daily weather div's src att url which includes open weather icon code for that day's weather
      var dayTwoImgEl = document.querySelector("#day-2-icon");
      var dayTwoIcon = data.daily[2].weather[0].icon;
      dayTwoImgEl.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + dayTwoIcon + "@2x.png"
      );

      // getting daily temp from data object and rendering it on page
      var day2Temp = data.daily[2].temp.day;
      dayTwoTempEl.textContent = "Temp: " + day2Temp + "°F";

      // getting daily wind from data object and rendering it on page
      var day2Wind = data.daily[2].wind_speed;
      dayTwoWindEl.textContent = "Wind: " + day2Wind + " MPH";

      // getting daily humidity from data object and rendering it on page
      var day2Humidity = data.daily[2].humidity;
      dayTwoHumidityEl.textContent = "Humidity: " + day2Humidity + "%";

      // DAY-3 weather
      // icon assigned to daily weather div's src att url which includes open weather icon code for that day's weather
      var dayThreeImgEl = document.querySelector("#day-3-icon");
      var dayThreeIcon = data.daily[3].weather[0].icon;
      dayThreeImgEl.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + dayThreeIcon + "@2x.png"
      );

      // getting daily temp from data object and rendering it on page
      var day3Temp = data.daily[3].temp.day;
      dayThreeTempEl.textContent = "Temp: " + day3Temp + "°F";

      // getting daily wind from data object and rendering it on page
      var day3Wind = data.daily[3].wind_speed;
      dayThreeWindEl.textContent = "Wind: " + day3Wind + " MPH";

      // getting daily humidity from data object and rendering it on page
      var day3Humidity = data.daily[3].humidity;
      dayThreeHumidityEl.textContent = "Humidity: " + day3Humidity + "%";

      // DAY-4 weather
      // icon assigned to daily weather div's src att url which includes open weather icon code for that day's weather
      var dayFourImgEl = document.querySelector("#day-4-icon");
      var dayFourIcon = data.daily[4].weather[0].icon;
      dayFourImgEl.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + dayFourIcon + "@2x.png"
      );

      // getting daily temp from data object and rendering it on page
      var day4Temp = data.daily[4].temp.day;
      dayFourTempEl.textContent = "Temp: " + day4Temp + "°F";

      // getting daily wind from data object and rendering it on page
      var day4Wind = data.daily[4].wind_speed;
      dayFourWindEl.textContent = "Wind: " + day4Wind + " MPH";

      // getting daily humidity from data object and rendering it on page
      var day4Humidity = data.daily[4].humidity;
      dayFourHumidityEl.textContent = "Humidity: " + day4Humidity + "%";

      // DAY-5 weather
      // icon assigned to daily weather div's src att url which includes open weather icon code for that day's weather
      var dayFiveImgEl = document.querySelector("#day-5-icon");
      var dayFiveIcon = data.daily[5].weather[0].icon;
      dayFiveImgEl.setAttribute(
        "src",
        "http://openweathermap.org/img/wn/" + dayFiveIcon + "@2x.png"
      );

      // getting daily temp from data object and rendering it on page
      var day5Temp = data.daily[5].temp.day;
      dayFiveTempEl.textContent = "Temp: " + day5Temp + "°F";

      // getting daily wind from data object and rendering it on page
      var day5Wind = data.daily[5].wind_speed;
      dayFiveWindEl.textContent = "Wind: " + day5Wind + " MPH";

      // getting daily humidity from data object and rendering it on page
      var day5Humidity = data.daily[5].humidity;
      dayFiveHumidityEl.textContent = "Humidity: " + day5Humidity + "%";
    });
}


// get the parsed data from local storage stored under the 'cities' key/
// if there are stored cities in local storage, include them in the past searches array 
var storedCities = JSON.parse(localStorage.getItem("cities"));
if (storedCities) {
  pastSearches = storedCities;
}

// function to stringify and set the past searched array in local storage under 'cities'
function storeSearches(){
    localStorage.setItem("cities", JSON.stringify(pastSearches));
}

// Search button is clicked,
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (!searchInput.value) {
    return;
  }

  city = searchInput.value.trim()
//   alert(city)

console.log(city);

  pastSearches.push(city);
  searchInput.value = "";

  getLatLon(city, apiKey);
  storeSearches()
  renderSearches();

});

renderSearches()

function renderSearches(){
    // clear the content of the ul element so that all the items from pastSearches array are not repeatedly rendered with each new entry
    historyList.innerHTML = "";
      // //   // Render a new li for each pastCity
  for (var i = 0; i < pastSearches.length; i++) {
    var pastCity = pastSearches[i];
    var li = document.createElement("li");
    var button = document.createElement("button");
    button.textContent = pastCity;
    button.setAttribute("style", "width: 100%; background-color: grey; margin: 5px; padding: 3px; border-radius: 10px")
    li.appendChild(button);
    historyList.appendChild(li);
  }
};
// if (JSON.parse(localStorage.getItem("city"))) {
//   pastSearches = JSON.parse(localStorage.getItem("city"));
// }

//   if (!searchInput.value) {
//     return;
//   }

//   // search input is set in local storage
//   pastSearches.push(searchInput);
//   localStorage.setItem("city", JSON.stringify(pastSearches));
//   console.log(pastSearches);

//   var listItem = document.createElement("li");

//   // var searchItem = document.createElement('li');
//   // console.log(searchItem)
//   // var pastSearchBtn = document.createElement('button')
//   // historyListEl.append(pastSearchBtn)
//   // // var pastBtn = document.createElement('button')
//   // // pastBtn.innerHTML = searchBtn.value
//   // // console.log(pastBtn)
//   // // searchItem.append(pastBtn)
//   // // historyListEl.append(searchItem)

//if search input has a value, it is pushed to an array and set in local storage

//a list item is created in the DOM
//a button el is created, its text is set to the value in the search city input
// the button is appended to the list item
//the list item is appended to the unordered list in the DOM
