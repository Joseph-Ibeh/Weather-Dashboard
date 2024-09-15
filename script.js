document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value;
  const apiKey = "9e1fad637fb2745c4c34ddd556ec6f0f";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const weatherDetails = document.getElementById("weatherDetails");
      const errorElement = document.getElementById("error");

      if (data.cod === 200) {
        // Success - display weather data
        errorElement.textContent = "";
        weatherDetails.style.display = "block";

        // Clear previous weather condition
        weatherDetails.className = "weather-info";

        const weatherCondition = data.weather[0].main.toLowerCase();

        if (weatherCondition.includes("clear")) {
          weatherDetails.classList.add("weather-sunny");
        } else if (weatherCondition.includes("rain")) {
          weatherDetails.classList.add("weather-rainy");
        } else if (weatherCondition.includes("cloud")) {
          weatherDetails.classList.add("weather-cloudy");
        } else if (weatherCondition.includes("snow")) {
          weatherDetails.classList.add("weather-snowy");
        }

        // Weather information
        document.getElementById("cityName").textContent = data.name;
        document.getElementById(
          "temperature"
        ).textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById(
          "weatherDescription"
        ).textContent = `Weather: ${data.weather[0].description}`;
        document.getElementById(
          "humidity"
        ).textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById(
          "windSpeed"
        ).textContent = `Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById(
          "pressure"
        ).textContent = `Pressure: ${data.main.pressure} hPa`;
        document.getElementById(
          "feelsLike"
        ).textContent = `Feels Like: ${data.main.feels_like}°C`;

        // Convert sunrise and sunset from UNIX timestamp to readable time
        const sunriseTime = new Date(
          data.sys.sunrise * 1000
        ).toLocaleTimeString();
        const sunsetTime = new Date(
          data.sys.sunset * 1000
        ).toLocaleTimeString();
        document.getElementById(
          "sunrise"
        ).textContent = `Sunrise: ${sunriseTime}`;
        document.getElementById("sunset").textContent = `Sunset: ${sunsetTime}`;

        // Display weather icon
        const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weatherIcon").src = icon;
        document.getElementById("weatherIcon").alt =
          data.weather[0].description;
      } else if (data.cod === 404) {
        // City not found
        weatherDetails.style.display = "none"; // Hide weather info
        errorElement.textContent =
          "City not found. Please try again with a valid city and country code.";
      } else {
        // Other errors
        weatherDetails.style.display = "none"; // Hide weather info
        errorElement.textContent = `Error: ${data.message}`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("error").textContent =
        "Error fetching weather data. Please try again later.";
    });
});
