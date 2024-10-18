const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const AQI = document.getElementById('aqi');



const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');


async function checkWeather(city){
    const api_key = "57af61c0ecc2fbd9ccbb363213b35b1f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());


    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
    AQI.innerHTML = `${weather_data.main.aqi}%`;


    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "/Image/cloud.png";
            break;
            
        case 'Clear':
            weather_img.src = "/Image/clear.png";
            break;
        case 'Rain':
            weather_img.src = "/Image/rain.png";
            break;
        case 'Mist':
            weather_img.src = "/Image/mist.png";
            break;
        case 'Snow':
            weather_img.src = "/Image/snow.png";
            break;

    }

    console.log(weather_data);
}


searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});

// Function to set the background image based on the weather condition
function setWeatherBackground(condition) {
    const container = document.getElementById('weatherContainer');

    if (condition === 'sunny') {
        container.style.backgroundImage = "url('D:\Project\Weather webPage\Image')"; // Replace with your sunny image URL
    } else if (condition === 'Clouds') {
        container.style.backgroundImage = "url('D:\Project\Weather webPage\Image')"; // Replace with your cloudy image URL
    } else {
        container.style.backgroundImage = "url('https://example.com/default.jpg')"; // Default image
    }
}

// Simulate weather data for demonstration
function updateWeatherData(condition) {
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const locationNotFound = document.getElementById('locationNotFound');
    const weatherBody = document.getElementById('weatherBody');

    // Simulating weather data based on the condition
    if (condition) {
        weatherBody.style.display = 'flex';
        locationNotFound.style.display = 'none';
        setWeatherBackground(condition);

        // Example weather data
        temperature.innerHTML = '25<sup>°C</sup>';
        description.textContent = condition.charAt(0).toUpperCase() + condition.slice(1);
        humidity.textContent = '60%';
        windSpeed.textContent = '10 km/h';
    } else {
        weatherBody.style.display = 'none';
        locationNotFound.style.display = 'block';
    }
}

// Event listener for the search button
document.getElementById('searchBtn').addEventListener('click', function() {
    const locationInput = document.getElementById('locationInput').value.toLowerCase();

    // Simulate getting weather condition based on the input
    if (locationInput === 'sunny') {
        updateWeatherData('sunny');
    } else if (locationInput === 'cloudy') {
        updateWeatherData('cloudy');
    } else {
        updateWeatherData(null); // Simulating location not found
    }
});

