const apiKey = '5e37c8aeb590aefd4319cb15cdc3929c';

function searchWeather() {
  const city = document.getElementById('city').value;

  // Fetch current weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Convert temperature to Fahrenheit
      const temperatureKelvin = data.main.temp;
      const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;

      // Display current weather information
      document.getElementById('weather-info').innerHTML = `
        <h2>${data.name}</h2>
        <p>Date: ${new Date().toLocaleDateString()}</p>
        <p>Temperature: ${temperatureFahrenheit.toFixed(2)}°F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(error => console.error('Error fetching current weather:', error));

  // Fetch 5-day forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Display 5-day forecast
      const forecastElement = document.getElementById('forecast');
      forecastElement.innerHTML = '';
      for (let i = 0; i < data.list.length; i += 8) {
        const day = data.list[i];
        const date = new Date(day.dt_txt);
        const icon = day.weather[0].icon;
        const temperatureKelvin = day.main.temp;
        const temperatureFahrenheit = (temperatureKelvin - 273.15) * 9/5 + 32;
        const humidity = day.main.humidity;
        const windSpeed = day.wind.speed;

        const dayCard = document.createElement('div');
        dayCard.classList.add('day-card');
        dayCard.innerHTML = `
          <p>Date: ${date.toLocaleDateString()}</p>
          <p>Temperature: ${temperatureFahrenheit.toFixed(2)}°F</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
          <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather Icon">
        `;
        forecastElement.appendChild(dayCard);
      }
    })
    .catch(error => console.error('Error fetching 5-day forecast:', error));
}
