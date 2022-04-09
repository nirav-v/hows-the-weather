var apiKey = "ca40b1278d336ed063babe6c19e2f143"

var exampleApi = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + apiKey



function firstReq(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response.status);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
firstReq(exampleApi);






// var coordinatesUrl = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid="+ apiKey

// firstReq(coordinatesUrl);