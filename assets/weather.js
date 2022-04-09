var apiKey = "ca40b1278d336ed063babe6c19e2f143"
var city = "San Diego"
var lat;
var lon;

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
    });
}
// // example One Call API call
// callApi(exampleOneCallApi)

FiveDayForecast(exampleOneCallApi)

// var coordinatesUrl = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid="+ apiKey

// firstReq(coordinatesUrl);