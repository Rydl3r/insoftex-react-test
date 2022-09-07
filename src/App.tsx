import { useState, useEffect } from "react";
import WeatherSide from "./components/WeatherSide";
import Stats from "./components/Stats";
import WeekInfo from "./components/WeekInfo";
import Loader from "./components/Loader";
import { Weather, Coordinates } from "./utils/types";

function App(): JSX.Element {
  // basic states for weather date and city input
  const [weather, setWeather] = useState<Weather | null>(null);
  const [city, setCity] = useState<string>("London");

  //OpenWeatherMap API  only works with coords, not city names so here we're fetching coords for given city input
  const fetchCoords = async (city: string): Promise<Coordinates[]> => {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${
        city ? city : "London"
      }&appid=2c8d06cad01c164f8d7f408a52dec281`
    );
    const data: [] | Coordinates[] = res.ok ? await res.json() : [];
    return data;
  };

  //main function that fetches weather. First we're fetching coords for given city and then we're fetching weather data for given coords
  const fetchWeather = async (): Promise<void> => {
    const coords: [] | Coordinates[] = await fetchCoords(city);
    if (coords.length === 0) {
      alert("City not found");
      return;
    }
    setWeather(null);
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${coords[0].lat}&lon=${coords[0].lon}&appid=2c8d06cad01c164f8d7f408a52dec281`
    );
    if (!weatherResponse.ok) {
      alert("Something went wrong. Please try again later.");
      return;
    }
    const weatherData: Weather = await weatherResponse.json();
    setWeather(weatherData);
    setCity("");
  };

  //fetch weather for london on first load
  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="App">
      {!weather || !weather?.list?.length ? (
        //if there is no weather data yet, show loader
        <Loader />
      ) : (
        //otherwise show weather data
        <div className="container">
          <WeatherSide weather={weather} />
          <div className="info_side">
            <Stats weather={weather} />
            <WeekInfo weather={weather} />
            <form
              className="location_selector"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                className="location_input"
                placeholder="Input your city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button className="location_button" onClick={fetchWeather}>
                Get Weather
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
