const input = document.getElementById("weatherSearch");
const search = document.querySelector(".search");
const cityName = document.querySelector(".cityName h2");
const temp = document.querySelector(".cityName h1");
const min_temp = document.querySelector(".min-temp");
const max_temp = document.querySelector(".max-temp");
const feels_like = document.querySelector(".feelsLike");
const humidity = document.querySelector(".humidity");
const wind_speed = document.querySelector(".windspeed");
const pressure = document.querySelector(".pressure");
const climateInfo = document.querySelector(".climateInfo");

const api_key = "ac33b1c180f385e338fdf962065272ac";

// Load last searched city or default city when page loads
document.addEventListener("DOMContentLoaded", () => {
	const savedCity = localStorage.getItem("lastCity") || "Delhi"; // Default city
	getWeather(savedCity);
});

// Function to fetch and display weather
async function getWeather(city) {
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			throw new Error("Could not fetch weather data");
		}
		const data = await response.json();

		cityName.innerHTML = `<h2>${data.name}</h2>`;
		temp.textContent = `${(data.main.temp - 273.15).toFixed(2)}°C`;
		min_temp.innerHTML = `<div>&nbsp;&nbsp;&nbsp;&nbsp;${(
			data.main.temp_min - 273.15
		).toFixed(2)}°C <br><span>Min-Temp</span></div>`;
		max_temp.innerHTML = `<div>&nbsp;&nbsp;&nbsp;&nbsp;${(
			data.main.temp_max - 273.15
		).toFixed(2)}°C<br><span>Max-Temp</span></div>`;
		feels_like.innerHTML = `<div>&nbsp;&nbsp;&nbsp;&nbsp;${(
			data.main.feels_like - 273.15
		).toFixed(2)}°C<br><span>Feels Like</span></div>`;
		humidity.innerHTML = `<div>&nbsp;&nbsp;&nbsp;&nbsp;${data.main.humidity}%<br><span>Humidity</span></div>`;
		wind_speed.innerHTML = `<div>&nbsp;&nbsp;&nbsp;&nbsp;${data.wind.speed} KPH<br><span>Wind Speed</span></div>`;
		pressure.innerHTML = `<div>&nbsp;&nbsp;&nbsp;&nbsp;${data.main.pressure} mm<br><span>Pressure</span></div>`;
        climateInfo.textContent = getWeatherEmoji(data.weather[0].id);
        function getWeatherEmoji(weatherId) {
					switch (true) {
						case weatherId >= 200 && weatherId < 300:
							return "⛈️";
						case weatherId >= 300 && weatherId < 400:
							return "🌧️";
						case weatherId >= 500 && weatherId < 600:
							return "🌧️";
						case weatherId >= 600 && weatherId < 700:
							return "❄️";
						case weatherId >= 700 && weatherId < 800:
							return "🌫️";
						case weatherId === 800:
							return "☀️";
						case weatherId >= 801 && weatherId < 810:
							return "☁️";
						default:
							return "❓";
					}
				}
		console.log(data);
		console.log(data.weather[0].id);
	} catch (error) {
		console.error(error);
		alert("Invalid city name. Please try again.");
	}
}

// Function to handle search action
function handleSearch() {
	const inputVal = input.value.trim();
	if (inputVal) {
		localStorage.setItem("lastCity", inputVal); // Save city in localStorage
		getWeather(inputVal);
	} else {
		alert("Enter city name");
	}
}

// Click event on search button
search.addEventListener("click", handleSearch);

// Enter key event in input field
input.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		handleSearch();
	}
});
