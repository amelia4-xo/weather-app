// #1
//display the current date and time

//DATE
console.log("Today");

let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let today = document.querySelector("#date-time");
today.innerHTML = `${day} ${hours}:${minutes}`;

// #2
//Add a search engine,
// Display the city name on the page after the user submits the form.
//CITY

//3
//Display a fake temperature(i.e 17) in Celsius and add a link to convert it to Fahrenheit.
//When clicking on it, it should convert the temperature to Fahrenheit.
//When clicking on Celsius, it should convert it back to Celsius.

function getFahren(event) {
  event.preventDefault();
  let temperature = document.querySelector("#the-temp");

  temperature.innerHTML = 54;
}
let Fahrenheit = document.querySelector("#fahren-deg");
Fahrenheit.addEventListener("click", getFahren);

function getCelsius(event) {
  event.preventDefault();

  temperature = document.querySelector("#the-temp");

  temperature.innerHTML = `12`;
}
let Celsius = document.querySelector("#celsius-deg");
Celsius.addEventListener("click", getCelsius);

//City search

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searching");
  cityName(cityInput.value);
  console.log(cityInput.value);
  //let search = document.querySelector("#searching");
  //let city = document.querySelector("#the-city");

  //if (search.value) {
  //  city.innerHTML = `${search.value}`;
  // cityName(search.value);
  //}
}
cityName("London");
let searchInput = document.querySelector(".search-form");
searchInput.addEventListener("click", searchCity);

// Display Weather
function displayWeather(response) {
  console.log(response.data);

  let theCity = document.querySelector("#the-city");
  let dayCity = response.data.name;
  theCity.innerHTML = `${dayCity}`;
  let dayTemp = Math.round(response.data.main.temp);
  let tempDegrees = document.querySelector("#the-temp");
  let description = response.data.weather[0].description;
  let dayDescription = document.querySelector("#day-Description");
  let sunCloud = document.querySelector("#sun-cloud-icon");
  sunCloud.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  sunCloud.setAttribute("alt", response.data.weather[0].description);
  tempDegrees.innerHTML = `${dayTemp}`;
  dayDescription.innerHTML = `${description}`;
}

function cityName(city) {
  let apiKey = "07a6557f6ce1a74d4e6b6d0c863ab142";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}
//Current
function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "07a6557f6ce1a74d4e6b6d0c863ab142";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentTemperature = document.querySelector("#current-weather");
currentTemperature.addEventListener("click", getPosition);
