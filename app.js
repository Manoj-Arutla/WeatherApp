const API_KEY = "7e59c4c1c08d99748fa5c618d0766e57";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityEl = document.querySelector('#city');
const tempEl = document.querySelector('#temp');
const conditionEl = document.querySelector('#condition');
const feelsEl = document.querySelector('#feels');
const humidityEl = document.querySelector('#humidity');
const windEl = document.querySelector('#wind');


searchBtn.addEventListener("click", fetchWeather);
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") fetchWeather();
});

async function fetchWeather() {
  const city = cityInput.value.trim().toLowerCase();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    cityEl.textContent = data.name;
    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    conditionEl.textContent = data.weather[0].main;
    feelsEl.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
    windEl.textContent = `Wind: ${data.wind.speed} m/s`;



    

  } catch (error) {
    alert(error.message);
  }
}
