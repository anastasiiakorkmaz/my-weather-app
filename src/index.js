function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[currentTime.getDay()];
  let hour = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${currentDay} ${hour}:${minutes}`;
}

let currentDate = document.querySelector(".date");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

function showWeatherData(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#sky-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
}

function searchCity(city) {
  let apiKey = "79ee03a958e204e023122acbd595e9dc";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeatherData);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function convertFahrenheit(event) {
  event.preventDefault();

  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = Math.round(30 * 1.8 + 32);
}

function convertCelsius(event) {
  event.preventDefault();

  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = 30;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);

let celsius = document.querySelector("#celcius");
celsius.addEventListener("click", convertCelsius);

function currentPosition(position) {
  let apiKey = "79ee03a958e204e023122acbd595e9dc";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showWeatherData);
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showPosition);

searchCity("Kyiv");
