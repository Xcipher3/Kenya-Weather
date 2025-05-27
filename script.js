// Kenyan counties with their coordinates
const kenyaCounties = [
    { name: 'Nairobi', lat: -1.2921, lon: 36.8219 },
    { name: 'Mombasa', lat: -4.0435, lon: 39.6682 },
    { name: 'Kisumu', lat: -0.1022, lon: 34.7617 },
    { name: 'Nakuru', lat: -0.3031, lon: 36.0800 },
    { name: 'Eldoret', lat: 0.5204, lon: 35.2697 },
    { name: 'Thika', lat: -1.0333, lon: 37.0833 },
    { name: 'Malindi', lat: -3.2175, lon: 40.1191 },
    { name: 'Kitale', lat: 1.0167, lon: 35.0000 },
    { name: 'Garissa', lat: -0.4536, lon: 39.6461 },
    { name: 'Kakamega', lat: 0.2833, lon: 34.7500 },
    { name: 'Nyeri', lat: -0.4167, lon: 36.9500 },
    { name: 'Meru', lat: 0.0500, lon: 37.6500 },
    { name: 'Machakos', lat: -1.5167, lon: 37.2667 },
    { name: 'Kerugoya', lat: -0.5000, lon: 37.2833 },
    { name: 'Embu', lat: -0.5333, lon: 37.4500 },
    { name: 'Narok', lat: -1.0833, lon: 35.8667 },
    { name: 'Kisii', lat: -0.6833, lon: 34.7667 },
    { name: 'Naivasha', lat: -0.7167, lon: 36.4333 },
    { name: 'Nanyuki', lat: 0.0167, lon: 37.0667 },
    { name: 'Lamu', lat: -2.2697, lon: 40.9000 },
    { name: 'Wajir', lat: 1.7471, lon: 40.0573 },
    { name: 'Mandera', lat: 3.9361, lon: 41.8672 },
    { name: 'Marsabit', lat: 2.3333, lon: 37.9833 },
    { name: 'Isiolo', lat: 0.3500, lon: 37.5833 },
    { name: 'Tharaka-Nithi', lat: -0.3333, lon: 37.8333 },
    { name: 'Kitui', lat: -1.3667, lon: 38.0167 },
    { name: 'Makueni', lat: -2.2833, lon: 37.8333 },
    { name: 'Nyandarua', lat: -0.5333, lon: 36.6000 },
    { name: 'Kirinyaga', lat: -0.5000, lon: 37.2833 },
    { name: 'Murang\'a', lat: -0.7167, lon: 37.1500 },
    { name: 'Kiambu', lat: -1.1667, lon: 36.8333 },
    { name: 'Turkana', lat: 3.1167, lon: 35.6000 },
    { name: 'West Pokot', lat: 1.4167, lon: 35.1167 },
    { name: 'Samburu', lat: 1.1167, lon: 36.6833 },
    { name: 'Trans Nzoia', lat: 1.0167, lon: 35.0000 },
    { name: 'Uasin Gishu', lat: 0.5204, lon: 35.2697 },
    { name: 'Elgeyo Marakwet', lat: 0.5167, lon: 35.2833 },
    { name: 'Nandi', lat: 0.1833, lon: 35.1167 },
    { name: 'Baringo', lat: 0.4667, lon: 35.9667 },
    { name: 'Laikipia', lat: 0.0167, lon: 37.0667 },
    { name: 'Kajiado', lat: -1.8500, lon: 36.7833 },
    { name: 'Kericho', lat: -0.3667, lon: 35.2833 },
    { name: 'Bomet', lat: -0.7833, lon: 35.3333 },
    { name: 'Vihiga', lat: 0.0833, lon: 34.7167 },
    { name: 'Bungoma', lat: 0.5667, lon: 34.5667 },
    { name: 'Busia', lat: 0.4667, lon: 34.1167 },
    { name: 'Siaya', lat: 0.0667, lon: 34.2833 },
    { name: 'Homa Bay', lat: -0.5167, lon: 34.4500 },
    { name: 'Migori', lat: -1.0667, lon: 34.4667 },
    { name: 'Nyamira', lat: -0.5667, lon: 34.9500 }
];

// Cache for weather data
let weatherCache = {
    current: {},
    forecast: {},
    lastUpdated: {}
};

// DOM Elements
const searchInput = document.getElementById('county-search');
const searchResults = document.getElementById('search-results');
const locationDisplay = document.getElementById('location');
const dateDisplay = document.getElementById('date');
const temperatureDisplay = document.getElementById('temperature');
const weatherConditionDisplay = document.getElementById('weather-condition');
const highLowDisplay = document.getElementById('high-low');
const windSpeedDisplay = document.getElementById('wind-speed');
const humidityDisplay = document.getElementById('humidity');
const pressureDisplay = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecast-container');
const weatherDisplay = document.getElementById('weather-display');
const weatherIcon = document.getElementById('weather-icon');

// Fetch current weather data
async function fetchCurrentWeather(lat, lon) {
    try {
        console.log('Fetching current weather for:', lat, lon);
        const url = `${CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${CONFIG.API_KEY}`;
        console.log('API URL:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(`Weather data fetch failed: ${errorData.message || response.statusText}`);
        }
        const data = await response.json();
        console.log('Current weather data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
}

// Fetch 5-day forecast
async function fetchForecast(lat, lon) {
    try {
        console.log('Fetching forecast for:', lat, lon);
        const url = `${CONFIG.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${CONFIG.API_KEY}`;
        console.log('API URL:', url);
        
        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData);
            throw new Error(`Forecast data fetch failed: ${errorData.message || response.statusText}`);
        }
        const data = await response.json();
        console.log('Forecast data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        throw error;
    }
}

// Update weather display with current weather data
function updateCurrentWeather(data, county) {
    const temp = utils.kelvinToCelsius(data.main.temp);
    const feelsLike = utils.kelvinToCelsius(data.main.feels_like);
    const tempMax = utils.kelvinToCelsius(data.main.temp_max);
    const tempMin = utils.kelvinToCelsius(data.main.temp_min);
    const windSpeed = utils.msToKmh(data.wind.speed);
    const conditionCode = data.weather[0].id;

    // Update location and date
    locationDisplay.textContent = `${county.name}, Kenya`;
    dateDisplay.textContent = utils.getCurrentDate();

    // Update temperature and weather condition
    temperatureDisplay.textContent = `${temp}°C`;
    weatherConditionDisplay.textContent = utils.getWeatherDescription(conditionCode);
    highLowDisplay.textContent = `H: ${tempMax}° L: ${tempMin}°`;

    // Update additional weather info
    windSpeedDisplay.textContent = `${windSpeed} km/h`;
    humidityDisplay.textContent = `${data.main.humidity}%`;
    pressureDisplay.textContent = `${data.main.pressure} hPa`;

    // Update weather icon and background
    weatherIcon.innerHTML = `<i class="fas ${utils.getWeatherIcon(conditionCode)}"></i>`;
    weatherDisplay.className = `weather-card-display ${utils.getWeatherBackground(conditionCode)} text-white p-8 relative overflow-hidden h-96`;

    // Update last updated time
    utils.updateLastUpdated();
}

// Update forecast display
function updateForecast(data) {
    // Clear existing forecast
    forecastContainer.innerHTML = '';

    // Get daily forecasts (one per day)
    const dailyForecasts = data.list.filter((forecast, index) => index % 8 === 0).slice(0, 5);

    dailyForecasts.forEach(forecast => {
        const temp = utils.kelvinToCelsius(forecast.main.temp);
        const conditionCode = forecast.weather[0].id;
        const date = utils.formatDate(forecast.dt);
        const time = utils.formatTime(forecast.dt);

        const forecastCard = document.createElement('div');
        forecastCard.className = 'flip-card cursor-pointer h-24';
        forecastCard.innerHTML = `
            <div class="flip-card-inner h-full">
                <div class="flip-card-front bg-blue-50 rounded-lg p-2 flex flex-col items-center justify-center">
                    <div class="text-sm font-medium">${date}</div>
                    <div class="text-xs text-gray-500">${time}</div>
                    <i class="fas ${utils.getWeatherIcon(conditionCode)} text-xl my-1"></i>
                    <div class="text-sm">${temp}°</div>
                </div>
                <div class="flip-card-back bg-blue-100 rounded-lg p-2 flex flex-col items-center justify-center">
                    <div class="text-xs text-center">${utils.getWeatherDescription(conditionCode)}</div>
                    <div class="text-xs mt-1">Wind: ${utils.msToKmh(forecast.wind.speed)}km/h</div>
                    <div class="text-xs mt-1">Humidity: ${forecast.main.humidity}%</div>
                </div>
            </div>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

// Update weather for selected county
async function updateWeatherForCounty(county) {
    try {
        utils.showLoading();
        utils.hideError();

        // Check cache
        const cacheKey = `${county.lat},${county.lon}`;
        const now = Date.now();
        const cacheAge = now - (weatherCache.lastUpdated[cacheKey] || 0);

        let currentWeather, forecast;

        if (cacheAge < CONFIG.CACHE_DURATION && weatherCache.current[cacheKey] && weatherCache.forecast[cacheKey]) {
            // Use cached data
            currentWeather = weatherCache.current[cacheKey];
            forecast = weatherCache.forecast[cacheKey];
        } else {
            // Fetch new data
            [currentWeather, forecast] = await Promise.all([
                fetchCurrentWeather(county.lat, county.lon),
                fetchForecast(county.lat, county.lon)
            ]);

            // Update cache
            weatherCache.current[cacheKey] = currentWeather;
            weatherCache.forecast[cacheKey] = forecast;
            weatherCache.lastUpdated[cacheKey] = now;
        }

        // Update UI
        updateCurrentWeather(currentWeather, county);
        updateForecast(forecast);

        // Hide search results
        searchResults.classList.add('hidden');
        searchInput.value = '';

    } catch (error) {
        console.error('Error updating weather:', error);
        utils.showError();
    } finally {
        utils.hideLoading();
    }
}

// Filter counties based on search input
function filterCounties(searchTerm) {
    console.log('Filtering counties for:', searchTerm);
    const results = kenyaCounties.filter(county =>
        county.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('Filtered results:', results);
    return results;
}

// Display search results
function displaySearchResults(results) {
    console.log('Displaying search results:', results);
    searchResults.innerHTML = '';
    if (results.length === 0) {
        searchResults.classList.add('hidden');
        return;
    }

    results.forEach(county => {
        const div = document.createElement('div');
        div.className = 'p-2 hover:bg-gray-100 cursor-pointer';
        div.textContent = county.name;
        div.addEventListener('click', () => {
            console.log('Selected county:', county);
            updateWeatherForCounty(county);
        });
        searchResults.appendChild(div);
    });

    searchResults.classList.remove('hidden');
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
    console.log('Search input:', e.target.value);
    const searchTerm = e.target.value.trim();
    if (searchTerm.length === 0) {
        searchResults.classList.add('hidden');
        return;
    }
    const results = filterCounties(searchTerm);
    displaySearchResults(results);
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.add('hidden');
    }
});

// Retry loading weather data
window.retryWeatherLoad = () => {
    const currentCounty = kenyaCounties.find(
        county => county.name === locationDisplay.textContent.split(',')[0]
    );
    if (currentCounty) {
        updateWeatherForCounty(currentCounty);
    }
};

// Initialize with Nairobi weather
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    console.log('CONFIG:', CONFIG);
    const nairobi = kenyaCounties.find(county => county.name === 'Nairobi');
    if (nairobi) {
        console.log('Initializing with Nairobi:', nairobi);
        updateWeatherForCounty(nairobi);
    } else {
        console.error('Nairobi not found in counties list');
    }
}); 