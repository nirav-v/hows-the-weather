// variables storing api key, city, lattitude and longitude, to be used inside url being fetched
// city, lat and lon, can later become dynamically assinged based on user search input
var apiKey = "ca40b1278d336ed063babe6c19e2f143"
var city = "San Diego"
var lat;
var lon;
var currentTempEl = document.querySelector("#current-temp")
var currentWindEl = document.querySelector("#current-wind")
var currentHumidityEl = document.querySelector("#current-humidity")
var currentUvEl = document.querySelector("#current-uv")


var icon;
var day1WeatherEl = document.querySelector('#day-1-weather')
// variables selecting HTML elements for rendering daily weather data
// daily temp elements
var dayOneTempEl = document.querySelector("#day-1-temp")
var dayTwoTempEl = document.querySelector("#day-2-temp")
var dayThreeTempEl = document.querySelector("#day-3-temp")
var dayFourTempEl = document.querySelector("#day-4-temp")
var dayFiveTempEl = document.querySelector("#day-5-temp")

//daily wind elements
var dayOneWindEl = document.querySelector("#day-1-wind")
var dayTwoWindEl = document.querySelector("#day-2-wind")
var dayThreeWindEl = document.querySelector("#day-3-wind")
var dayFourWindEl = document.querySelector("#day-4-wind")
var dayFiveWindEl = document.querySelector("#day-5-wind")

// daily humididty elements
var dayOneHumidityEl = document.querySelector("#day-1-humidity")
var dayTwoHumidityEl = document.querySelector("#day-2-humidity")
var dayThreeHumidityEl = document.querySelector("#day-3-humidity")
var dayFourHumidityEl = document.querySelector("#day-4-humidity")
var dayFiveHumidityEl = document.querySelector("#day-5-humidity")




// var exampleApi = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + apiKey

// exclude uncessary data like hourly, munitely, alerts. Make sure daily is not excluded. units = imperial make temp in farrenheit, wind mph.
var exampleOneCallApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + "32" + "&lon=" + "-117" + ".04&exclude=hourly,minutely,alerts&units=imperial&appid=" + apiKey

// to get lat and long of a city
var exampleGeolocationApi = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=" + apiKey

// function callApi(requestUrl) {
//   fetch(requestUrl)
//     .then(function (response) {
//       console.log(requestUrl);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// }
// // // example API call
// // callApi(exampleApi);

function getLatLon(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(requestUrl);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log("lattitude: " + data[0].lat + " longitude: " + data[0].lon)
      lat = data[0].lat;
      lon =  data[0].lon;
    });
}

// example gelocation API call
// callApi(exampleGeolocationApi)

getLatLon(exampleGeolocationApi)

function FiveDayForecast(OneCallUrl) {
  fetch(OneCallUrl)
    .then(function (response) {
      console.log(OneCallUrl);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentTemp = data.current.temp
      currentTempEl.textContent = "Temp: " + currentTemp + "°F"
      var currentWind = data.current.wind_speed
      currentWindEl.textContent = "Wind: " + currentWind + " MPH"
      var currentHumidity = data.current.humidity
      currentHumidityEl.textContent = "Humidity: " + currentHumidity + " %"
      var currentUV = data.current.uvi
      currentUvEl.textContent = "UV Index: " + currentUV 
    
    // assigning daily weather divs src att to url with icon from that day

    dayOneImgEl = document.querySelector('#day-1-icon')
    var dayOneIcon = data.daily[1].weather[0].icon;
    dayOneImgEl.setAttribute('src', "http://openweathermap.org/img/wn/" + dayOneIcon + "@2x.png")
    // console.log(dayOneIcon)
    
    // getting daily temp from data object and rendering it on page
    var day1Temp = data.daily[1].temp.day
    console.log(day1Temp)
    dayOneTempEl.textContent = "Temp: " + day1Temp + "°F"

    // getting daily wind from data object and rendering it on page
    var day1Wind = data.daily[1].wind_speed
    console.log(day1Wind)
    dayOneWindEl.textContent = "Wind: " + day1Wind + " MPH"

    // getting daily humidity from data object and rendering it on page
       var day1Humidity = data.daily[1].humidity
    console.log(day1Humidity)
    dayOneHumidityEl.textContent = "Humidity: " + day1Humidity + "%"

    // dayOneImgEl = document.querySelector('#day-1-icon')
    // var dayOneIcon = data.daily[1].weather[0].icon;
    // dayOneImgEl.setAttribute('src', "http://openweathermap.org/img/wn/" + dayOneIcon + "@2x.png")

    // var day2Temp = data.daily[2].temp.day
    // console.log(day2Temp)
    // dayTwoTempEl.textContent = "Temp: " + day2Temp

     });


}
// // example One Call API call
// callApi(exampleOneCallApi)

FiveDayForecast(exampleOneCallApi)

// var coordinatesUrl = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid="+ apiKey

// firstReq(coordinatesUrl);