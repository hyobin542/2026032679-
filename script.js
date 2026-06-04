// ======================================
// OpenWeather API Key
// ======================================
const API_KEY = "9facb7169c22776098044d45ff8a5d30";

// ======================================
// HTML 요소 가져오기
// ======================================
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

// ======================================
// 날씨에 따른 이모지
// ======================================
function getWeatherEmoji(weatherMain) {
    switch (weatherMain) {
        case "Clear":
            return "☀️";

        case "Clouds":
            return "☁️";

        case "Rain":
            return "🌧️";

        case "Drizzle":
            return "🌦️";

        case "Thunderstorm":
            return "⛈️";

        case "Snow":
            return "❄️";

        case "Mist":
        case "Fog":
        case "Haze":
            return "🌫️";

        default:
            return "🌤️";
    }
}

// ======================================
// 날씨에 따른 배경 변경
// ======================================
function changeBackground(weatherMain) {

    const body = document.body;

    switch (weatherMain) {

        case "Clear":
            body.style.background =
                "linear-gradient(135deg, #56CCF2, #2F80ED)";
            break;

        case "Clouds":
            body.style.background =
                "linear-gradient(135deg, #BDC3C7, #2C3E50)";
            break;

        case "Rain":
        case "Drizzle":
            body.style.background =
                "linear-gradient(135deg, #4B79A1, #283E51)";
            break;

        case "Thunderstorm":
            body.style.background =
                "linear-gradient(135deg, #232526, #414345)";
            break;

        case "Snow":
            body.style.background =
                "linear-gradient(135deg, #E6DADA, #274046)";
            break;

        case "Mist":
        case "Fog":
        case "Haze":
            body.style.background =
                "linear-gradient(135deg, #757F9A, #D7DDE8)";
            break;

        default:
            body.style.background =
                "linear-gradient(135deg, #74ebd5, #9face6)";
    }
}

// ======================================
// 날씨 데이터 가져오기
// ======================================
async function getWeather(city) {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("도시를 찾을 수 없습니다.");
        }

        const data = await response.json();

        cityName.textContent = data.name;

        temp.textContent =
            Math.round(data.main.temp);

        description.textContent =
            data.weather[0].description;

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;

        humidity.textContent =
            `${data.main.humidity}%`;

        wind.textContent =
            `${data.wind.speed} m/s`;

        weatherIcon.textContent =
            getWeatherEmoji(data.weather[0].main);

        // 배경 변경
        changeBackground(data.weather[0].main);

    } catch (error) {

        alert(error.message);

    }
}

// ======================================
// 검색 버튼 클릭
// ======================================
searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city) {
        getWeather(city);
    }

});

// ======================================
// 엔터키 검색
// ======================================
cityInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        const city = cityInput.value.trim();

        if (city) {
            getWeather(city);
        }
    }

});

// ======================================
// 첫 화면 서울 표시
// ======================================
getWeather("Seoul");