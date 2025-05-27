// Utility functions for weather data handling
const utils = {
    // Convert temperature from Kelvin to Celsius
    kelvinToCelsius: (kelvin) => {
        return Math.round(kelvin - 273.15);
    },

    // Convert wind speed from m/s to km/h
    msToKmh: (ms) => {
        return Math.round(ms * 3.6);
    },

    // Format date to readable string
    formatDate: (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    },

    // Format time to readable string
    formatTime: (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    },

    // Get current date in readable format
    getCurrentDate: () => {
        const now = new Date();
        return now.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    },

    // Get weather icon based on OpenWeatherMap condition code
    getWeatherIcon: (conditionCode) => {
        const icons = {
            // Clear sky
            800: 'fa-sun',
            // Clouds
            801: 'fa-cloud-sun',
            802: 'fa-cloud',
            803: 'fa-cloud',
            804: 'fa-cloud',
            // Rain
            500: 'fa-cloud-rain',
            501: 'fa-cloud-showers-heavy',
            502: 'fa-cloud-showers-heavy',
            503: 'fa-cloud-showers-heavy',
            504: 'fa-cloud-showers-heavy',
            // Drizzle
            300: 'fa-cloud-rain',
            301: 'fa-cloud-rain',
            302: 'fa-cloud-rain',
            310: 'fa-cloud-rain',
            311: 'fa-cloud-rain',
            312: 'fa-cloud-rain',
            313: 'fa-cloud-rain',
            314: 'fa-cloud-rain',
            321: 'fa-cloud-rain',
            // Thunderstorm
            200: 'fa-bolt',
            201: 'fa-bolt',
            202: 'fa-bolt',
            210: 'fa-bolt',
            211: 'fa-bolt',
            212: 'fa-bolt',
            221: 'fa-bolt',
            230: 'fa-bolt',
            231: 'fa-bolt',
            232: 'fa-bolt',
            // Snow
            600: 'fa-snowflake',
            601: 'fa-snowflake',
            602: 'fa-snowflake',
            611: 'fa-snowflake',
            612: 'fa-snowflake',
            613: 'fa-snowflake',
            615: 'fa-snowflake',
            616: 'fa-snowflake',
            620: 'fa-snowflake',
            621: 'fa-snowflake',
            622: 'fa-snowflake',
            // Atmosphere
            701: 'fa-smog',
            711: 'fa-smog',
            721: 'fa-smog',
            731: 'fa-smog',
            741: 'fa-smog',
            751: 'fa-smog',
            761: 'fa-smog',
            762: 'fa-smog',
            771: 'fa-wind',
            781: 'fa-tornado'
        };
        return icons[conditionCode] || 'fa-cloud';
    },

    // Get weather background class based on OpenWeatherMap condition code
    getWeatherBackground: (conditionCode) => {
        const backgrounds = {
            // Clear sky
            800: 'sunny-bg',
            // Clouds
            801: 'partly-cloudy-bg',
            802: 'cloudy-bg',
            803: 'cloudy-bg',
            804: 'cloudy-bg',
            // Rain
            500: 'rainy-bg',
            501: 'rainy-bg',
            502: 'rainy-bg',
            503: 'rainy-bg',
            504: 'rainy-bg',
            // Drizzle
            300: 'rainy-bg',
            301: 'rainy-bg',
            302: 'rainy-bg',
            310: 'rainy-bg',
            311: 'rainy-bg',
            312: 'rainy-bg',
            313: 'rainy-bg',
            314: 'rainy-bg',
            321: 'rainy-bg',
            // Thunderstorm
            200: 'thunderstorm-bg',
            201: 'thunderstorm-bg',
            202: 'thunderstorm-bg',
            210: 'thunderstorm-bg',
            211: 'thunderstorm-bg',
            212: 'thunderstorm-bg',
            221: 'thunderstorm-bg',
            230: 'thunderstorm-bg',
            231: 'thunderstorm-bg',
            232: 'thunderstorm-bg',
            // Snow
            600: 'snowy-bg',
            601: 'snowy-bg',
            602: 'snowy-bg',
            611: 'snowy-bg',
            612: 'snowy-bg',
            613: 'snowy-bg',
            615: 'snowy-bg',
            616: 'snowy-bg',
            620: 'snowy-bg',
            621: 'snowy-bg',
            622: 'snowy-bg',
            // Atmosphere
            701: 'foggy-bg',
            711: 'foggy-bg',
            721: 'foggy-bg',
            731: 'foggy-bg',
            741: 'foggy-bg',
            751: 'foggy-bg',
            761: 'foggy-bg',
            762: 'foggy-bg',
            771: 'windy-bg',
            781: 'windy-bg'
        };
        return backgrounds[conditionCode] || 'cloudy-bg';
    },

    // Get weather description based on OpenWeatherMap condition code
    getWeatherDescription: (conditionCode) => {
        const descriptions = {
            // Clear sky
            800: 'Clear Sky',
            // Clouds
            801: 'Few Clouds',
            802: 'Scattered Clouds',
            803: 'Broken Clouds',
            804: 'Overcast Clouds',
            // Rain
            500: 'Light Rain',
            501: 'Moderate Rain',
            502: 'Heavy Rain',
            503: 'Very Heavy Rain',
            504: 'Extreme Rain',
            // Drizzle
            300: 'Light Drizzle',
            301: 'Drizzle',
            302: 'Heavy Drizzle',
            310: 'Light Drizzle',
            311: 'Drizzle',
            312: 'Heavy Drizzle',
            313: 'Shower Rain',
            314: 'Heavy Shower Rain',
            321: 'Shower Drizzle',
            // Thunderstorm
            200: 'Thunderstorm',
            201: 'Thunderstorm',
            202: 'Heavy Thunderstorm',
            210: 'Light Thunderstorm',
            211: 'Thunderstorm',
            212: 'Heavy Thunderstorm',
            221: 'Ragged Thunderstorm',
            230: 'Light Thunderstorm',
            231: 'Thunderstorm',
            232: 'Heavy Thunderstorm',
            // Snow
            600: 'Light Snow',
            601: 'Snow',
            602: 'Heavy Snow',
            611: 'Sleet',
            612: 'Light Shower Sleet',
            613: 'Shower Sleet',
            615: 'Light Rain and Snow',
            616: 'Rain and Snow',
            620: 'Light Shower Snow',
            621: 'Shower Snow',
            622: 'Heavy Shower Snow',
            // Atmosphere
            701: 'Mist',
            711: 'Smoke',
            721: 'Haze',
            731: 'Dust',
            741: 'Fog',
            751: 'Sand',
            761: 'Dust',
            762: 'Ash',
            771: 'Squall',
            781: 'Tornado'
        };
        return descriptions[conditionCode] || 'Unknown';
    },

    // Show loading state
    showLoading: () => {
        document.getElementById('loading-overlay').classList.remove('hidden');
        document.getElementById('weather-loading').classList.remove('hidden');
    },

    // Hide loading state
    hideLoading: () => {
        document.getElementById('loading-overlay').classList.add('hidden');
        document.getElementById('weather-loading').classList.add('hidden');
    },

    // Show error state
    showError: () => {
        document.getElementById('weather-error').classList.remove('hidden');
    },

    // Hide error state
    hideError: () => {
        document.getElementById('weather-error').classList.add('hidden');
    },

    // Update last updated time
    updateLastUpdated: () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('last-updated').textContent = `Last updated: ${timeString}`;
    }
}; 