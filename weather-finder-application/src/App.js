import { useState } from "react";
import "./index.css";

// put your OpenWeather API key here
const API_KEY = "79dc9bdbbc5ea429a7935e912faf21a7";

function App() {
  // store what the user types in the input
  const [city, setCity] = useState("");

  // store the weather data we get back
  const [weather, setWeather] = useState(null);

  // show loading text while fetching
  const [loading, setLoading] = useState(false);

  // show error if city not found
  const [error, setError] = useState("");

  // this runs when the user clicks the search button
  async function getWeather() {
    // don't do anything if input is empty
    if (city === "") return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      let response = await fetch(url);
      let data = await response.json();

      // openweather returns cod 404 if city not found
      if (data.cod === "404") {
        setError("City not found");
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  }

  // run search when user presses Enter
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      getWeather();
    }
  }

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>

      {/* search bar */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={function (e) { setCity(e.target.value); }}
          onKeyDown={handleKeyDown}
          className="input"
        />
        <button onClick={getWeather} className="btn">Search</button>
      </div>

      {/* loading message */}
      {loading && <p className="msg">Loading...</p>}

      {/* error message */}
      {error && <p className="msg error">{error}</p>}

      {/* weather result card */}
      {weather && (
        <div className="card">
          <h2 className="city-name">{weather.name}</h2>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="condition">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;