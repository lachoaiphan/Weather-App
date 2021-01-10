import axios from 'axios';

// factory functions for objects
const WeatherData = ((city, weatherType, weatherIcon, feelsLike, humidity, wind, temp) => {
  const editCity = (newcity) => {
    city = newcity;
  };
  const editWeatherType = (newWeatherType) => {
    weatherType = newWeatherType;
  };
  const editWeatherIcon = (newWeatherIcon) => {
    weatherIcon = newWeatherIcon;
  };
  const editTemp = (newTemp) => {
    temp = newTemp;
  };
  const editFeelsLike = (newFeelsLike) => {
    feelsLike = newFeelsLike;
  };
  const editHumidity = (newHumidity) => {
    humidity = newHumidity;
  };
  const editWind = (newWind) => {
    wind = newWind;
  };
  const getCity = () => city;
  const getWeatherType = () => weatherType;
  const getWeatherIcon = () => weatherIcon;
  const getTemp = () => temp;
  const getFeelsLike = () => feelsLike;
  const getHumidity = () => humidity;
  const getWind = () => wind;
  return {
    getCity,
    getWeatherType,
    getWeatherIcon,
    getTemp,
    getFeelsLike,
    getHumidity,
    getWind,
    editCity,
    editWeatherType,
    editWeatherIcon,
    editFeelsLike,
    editHumidity,
    editWind,
    editTemp,
  };
});

// API_KEY for demonstration of weather app
const API_KEY = '339d4a111a31bc628b7a06e30a49bece';
const currentWeatherData = WeatherData('London', '', '', 0);

// Conversion functions to fahrenheit and celsius
function convertToFahrenheit(temp) {
  return ((temp - 273.15) * (9 / 5)) + 32;
}

// Helper function to append child elements to parent element
function appendChildren(parent, children) {
  for (let i = 0; i < children.length; i += 1) parent.appendChild(children[i]);
}

// render into right container on changes

// reset right container on changes
function resetWeather() {
  const rightContainer = document.getElementById('right-weather-container');
  while (rightContainer.firstChild) { rightContainer.removeChild(rightContainer.lastChild); }
}

// render into right container on changes
function renderWeather() {
  const rightContainer = document.getElementById('right-weather-container');
  const fahrenheitSign = '<span class=\'fahrenheit\'>&#8457;</span>';
  const weatherIcon = `http://openweathermap.org/img/wn/${currentWeatherData.getWeatherIcon()}@2x.png`;
  if (rightContainer.childElementCount > 0) { resetWeather(); }
  const city = document.createElement('h2');
  const image = document.createElement('img');
  const temp = document.createElement('h3');
  const feelsLike = document.createElement('h3');
  const humidity = document.createElement('h3');
  const wind = document.createElement('h3');

  city.textContent = currentWeatherData.getCity();
  image.src = weatherIcon;
  temp.innerHTML = `${convertToFahrenheit(currentWeatherData.getTemp()).toFixed()} ${fahrenheitSign}`;
  feelsLike.innerHTML = `Feels Like: ${convertToFahrenheit(currentWeatherData.getFeelsLike()).toFixed()} ${fahrenheitSign}`;
  humidity.textContent = `Humidity: ${currentWeatherData.getHumidity()}%`;
  wind.textContent = `Wind: ${currentWeatherData.getWind().toFixed()}mph`;

  appendChildren(rightContainer, [city, image, temp, feelsLike, humidity, wind]);
}

// Weather API functions (async/await)
// Getting Weather Data
async function fetchWeatherData() {
  // fetches data from Weather API
  // Validate data
  // If not validated then send error and have no changes
  // Return data otherwise
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${currentWeatherData.getCity()}&appid=${API_KEY}`;
    const response = await axios.get(url);
    currentWeatherData.editWeatherType(response.data.weather[0].main);
    currentWeatherData.editWeatherIcon(response.data.weather[0].icon);
    currentWeatherData.editTemp(response.data.main.temp);
    currentWeatherData.editFeelsLike(response.data.main.feels_like);
    currentWeatherData.editHumidity(response.data.main.humidity);
    currentWeatherData.editWind(response.data.wind.speed);
    renderWeather();
  } catch (err) {
    alert(err);
  }
}

// Extract data from search bar
function getSearchData() {
  // get data from search data
  // extract info from search
  // if not filled out, html will send please fill out field
  // otherwise, send data
  const weatherField = document.getElementById('weather-field');
  if (!weatherField.value) return;
  currentWeatherData.editCity(weatherField.value);
  fetchWeatherData();
}

// EVent listener for search button to searchData
document.querySelector('#search-form button').addEventListener('click', getSearchData);

fetchWeatherData();
