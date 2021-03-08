// #1
//display the current date and time

//DATE

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

//Hourly forecast
function formatHours(timestamp) {
  let now = new Date(timestamp);

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

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
  let fahrenTemp = (celsiusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#the-temp");
  tempElement.innerHTML = Math.round(fahrenTemp);

  // Remove active class from celsisus

  Fahrenheit.classList.add("active");
  Celsius.classList.remove("active");
  //
}
let Fahrenheit = document.querySelector("#fahren-deg");
Fahrenheit.addEventListener("click", getFahren);
let celsiusTemp = null;

//Celsius Temperature
function getCelsius(event) {
  event.preventDefault();
  tempElement = document.querySelector("#the-temp");
  tempElement.innerHTML = Math.round(celsiusTemp);

  // Remove active class from F

  Celsius.classList.add("active");
  Fahrenheit.classList.remove("active");
  //
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

let searchInput = document.querySelector(".search-form");
searchInput.addEventListener("click", searchCity);

// Display Weather
function displayWeather(response) {
  console.log(response.data);

  let theCity = document.querySelector("#the-city");
  let dayCity = response.data.name;

  let dayTemp = Math.round(response.data.main.temp);
  let tempDegrees = document.querySelector("#the-temp");
  let description = response.data.weather[0].description;
  let dayDescription = document.querySelector("#day-Description");
  let sunCloud = document.querySelector("#sun-cloud-icon");

  //temp - global so it can be put within a function
  celsiusTemp = response.data.main.temp;
  //
  let windElement = document.querySelector("#windy");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  //
  theCity.innerHTML = `${dayCity}`;
  tempDegrees.innerHTML = `${dayTemp}`;
  dayDescription.innerHTML = `${description}`;
  sunCloud.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  sunCloud.setAttribute("alt", response.data.weather[0].description);
}
//

//AJAX
function cityName(city) {
  let apiKey = "07a6557f6ce1a74d4e6b6d0c863ab142";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
  //Forecast
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

  //
}
//forecast function
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
            <div class="the-day">${formatHours(forecast.dt * 1000)}</div>

                <br />
                <img src="https://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"
                alt=""
                />
                <br />
                <div class="day-temp">${Math.round(
                  forecast.main.temp_max
                )}°   <small>${Math.round(
      forecast.main.temp_min
    )}°</small></div>
              </div>`;
  }

  console.log(forecast);
}
//Current
function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "07a6557f6ce1a74d4e6b6d0c863ab142";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);

  //current forecast - attempt
  //apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${
  //position.hourly.dt * 1000
  // }&appid=${apiKey}&units=metric}`;
  // axios.get(apiUrl).then(displayForecast);
  //
}

//
function getPosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentTemperature = document.querySelector("#current-weather");
currentTemperature.addEventListener("click", getPosition);

//Default city
cityName("London");
