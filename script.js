const cityInput = document.querySelector(".city-Input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "94e8fd5c7320e6322e78e9428f479cd7"; // Api key for OpenWeatherMap Api

const createWeatherCard = (cityName, weatherItem, index) => {
  if (index === 0) {
    // HTML for main weather card
    return `<div class="details">
                <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                <h4>Wind: ${weatherItem.wind.speed} m/s</h4>
                <h4>Humidity: ${weatherItem.main.humidity}%</h4>
                <div class="icon">
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="Weather-icon">
                    <h4>${weatherItem.weather[0].description}</h4>
                </div>
            </div>`;
  } else {
    // HTML for the other five-day forecast card
    return `<li class="card">
                <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
                <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png" alt="Weather-icon">
                <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                <h4>Wind: ${weatherItem.wind.speed} m/s</h4>
                <h4>Humidity: ${weatherItem.main.humidity}%</h4>
            </li>`;
  }
};

const getWeatherDetails = (cityName, lat, lon) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(WEATHER_API_URL)
    .then((res) => res.json())
    .then((data) => {
      // Filter the forecasts to get only one forecast per day
      const uniqueForecastDays = [];
      const threeDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          uniqueForecastDays.push(forecastDate);
          return true;
        }
        return false;
      });

      // Clear the previous weather data
      currentWeatherDiv.innerHTML = "";
      weatherCardsDiv.innerHTML = "";

      // Creating weather cards and adding them to the DOM
      threeDaysForecast.forEach((weatherItem, index) => {
        if (index === 0) {
          currentWeatherDiv.insertAdjacentHTML(
            "beforeend",
            createWeatherCard(cityName, weatherItem, index)
          );
        } else {
          weatherCardsDiv.insertAdjacentHTML(
            "beforeend",
            createWeatherCard(cityName, weatherItem, index)
          );
        }
      });
    })
    .catch(() => {
      alert("An error occurred while fetching the weather forecast!");
    });
};




const getCityCoordinates = () => {
    const cityName = cityInput.value.trim(); // Use 'value' instead of 'Value' to get the input value
    if (!cityName) return; // Return if cityName is empty

    console.log(cityName);
    const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    //Get entered city coordinates(latitude,longitude,and name)from Api response
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {

        if (!data.length) return alert(`No coordinates found for ${cityName}`);
        const { name, lat, lon } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occured while fetching the cooridinathes!")
    });
}


const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude , longitude } = position.coords;
      const REVERSE_GEOCODING_URL=`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
     
     //Get city name from coordinates using reverse geocoding APIberagal
      fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
        const { name } = data[0];
        getWeatherDetails(name, latitude, longitude);
    }).catch(() => {
        alert("An error occured while fetching the city!")
    });

    },
    (error) => {
      if(error.code === error.PERMISSION_DENIED){
        alert("Geolocation request denied.Please reset location permission to access")
      }
    }
  );
}

locationButton.addEventListener("click", getUserCoordinates);
searchButton.addEventListener("click", getCityCoordinates);


/*
 __________________________________
/       Animation cloud Js        \
\___________________________________/


*/ 
function random(){
  var text=("weather 360");
  letter =text[Math.floor(Math.random()* text.length)];
  return letter;
}


function rain(){
  let cloud =document.querySelector('.cloud');
  let e=document.createElement('div');
  let left= Math.floor(Math.random() * 310);
  let size=Math.random() * 1.5;
  let duration=Math .random() *1;



  e.classList.add('text');
  cloud.appendChild(e);
  e.innerText =random()
  e.style.left=left +'px';
  e.style.fontSize=1.0+size+'em';
  e.style.animationDuration =1+duration+'s';


  setTimeout(function(){
    cloud.removeChild(e)
  },2000)
}

setInterval(function(){
  rain()
},20)