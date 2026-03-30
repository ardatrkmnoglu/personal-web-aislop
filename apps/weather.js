const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".weatherContainer");
const apiKey = "714924e9e7cc70b0c65c1d94d929dfc7";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("An error occured fetching weather data")
    }

    return await response.json();

}

function displayWeatherInfo(data) {

    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    let cityName = String(city);
    if (String(city).endsWith("Province")) {
        cityName = cityName.slice(0, cityName.indexOf(" "))
    }

    cityDisplay.textContent = cityName;
    tempDisplay.textContent = `${Math.round(temp - 273.15)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("city");
    tempDisplay.classList.add("temperature");
    humidityDisplay.classList.add("humidity");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {

    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
            break;

        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
            break;

        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
            break;

        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
            break;

        case (weatherId >= 700 && weatherId < 780):
            return "🌫️";
            break;

        case (weatherId === 781):
            return "🌪️";
            break;

        case (weatherId === 800):
            return "☀️";
            break;

        case (weatherId === 801):
            return "🌤️";
            break;

        case (weatherId === 802):
            return "⛅";
            break;

        case (weatherId === 803):
            return "🌥️";
            break;

        case (weatherId === 804):
            return "☁️";
            break;

        default:
            break;
    }

}

function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}