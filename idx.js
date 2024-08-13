const input = document.getElementById("user-input");
const btn = document.getElementById("search-btn");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btn.click();
  }
});

const responseSuccess = (type) => (response) => {
  if (response.ok) {
    switch (type) {
      case "url":
        return response.url;
      default:
        return response.json();
    }
  } else {
    throw Error();
  }
};

/** A function that hides an element.
 * If an element contains d-block class it replaces to d-none.
 * If an element doesn't contain d-none and d-block it adds d-none class. */

const hideEl = (el) => {
  if (el.classList.contains("d-block")) {
    el.classList.replace("d-block", "d-none");
  } else if (!el.classList.contains("d-none")) {
    el.classList.add("d-none");
  }
};

/** A function that displays an element simply by replacing d-none class to d-block. */
const showEl = (el) => {
  el.classList.replace("d-none", "d-block");
};

/** A function for resetting text content of an element by assigning an empty string to it. */
const resetTextContent = (el) => {
  el.textContent = "";
};

const getWeather = () => {
  const userInputElement = document.getElementById("user-input");
  //console.log(userInputElement.value)
  //console.log('hello')
  const errorMessageElement = document.getElementById("error-message");
  const weatherIconElement = document.getElementById("weather-icon");
  const city = userInputElement.value;
  const weatherTempElement = document.getElementById("weather-temp");
  const weatherCityElement = document.getElementById("weather-city");
  const wetherDescriptionElement = document.getElementById(
    "weather-description"
  );
  const weatherHumidityIconElement = document.getElementById(
    "weather-humidity-icon"
  );
  const weatherHumidityTextElement = document.getElementById(
    "weather-humidity-text"
  );
  const weatherWindIconElement = document.getElementById("weather-wind-icon");
  const weatherWindTextElement = document.getElementById("weather-wind-text");
  const errorMessage = "Something went wrong! Please try again!  ";

  const apikey = "";
  // Reset all text nodes
  const reset = () => {
    hideEl(weatherIconElement);
    hideEl(weatherHumidityIconElement);
    hideEl(weatherWindIconElement);
    resetTextContent(errorMessageElement);
    resetTextContent(weatherHumidityTextElement);
    resetTextContent(weatherWindTextElement);
    resetTextContent(wetherDescriptionElement);
    resetTextContent(weatherCityElement);
    resetTextContent(weatherTempElement);
  };

  const displayWeather = (data) => {
    // Temperature
    const temperature = Math.round(data.main.temp - 273.15);
    weatherTempElement.innerHTML = `${temperature}&deg;C`;
    weatherCityElement.textContent = data.name;
    wetherDescriptionElement.innerText = data.weather[0].description;

    // Humidity
    showEl(weatherHumidityIconElement);
    weatherHumidityTextElement.textContent = `${data.main.humidity}%`;

    // Wind
    showEl(weatherWindIconElement);
    weatherWindTextElement.textContent = `${Math.round(data.wind.speed)} m/s`;
  };

  //reset state
  reset();

  //input validate
  if (!city) {
    errorMessageElement.textContent = errorMessage;
  }
  errorMessageElement.textContent = "";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
  )
    .then(responseSuccess("json"))
    .then((data) => {
      displayWeather(data);
      const iconCode = data.weather[0].icon;

      return fetch(`https://openweathermap.org/img/wn/${iconCode}@4x.png`);
    })
    .then(responseSuccess("url"))

    .then((iconUrl) => {
      weatherIconElement.setAttribute("src", iconUrl);
      showEl(weatherIconElement);
      weatherIconElement.setAttribute("alt", "Weather icon");
    })
    .catch((e) => {
      errorMessageElement.textContent = errorMessage;
      console.error(e);
    });
};
