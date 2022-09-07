import { Weather } from "../utils/types";

//this is the component for displaying the weather for today in a nice format on the left side of the app
interface Props {
  weather: Weather;
}

const WeatherSide = ({ weather }: Props): JSX.Element => {
  //just some Date logic that helps us display today's date in a nice format
  const todayDate: string = new Date().toISOString().slice(0, 10);
  const weekday: string = new Date().toLocaleString("en-US", {
    weekday: "long",
  });
  //imgLink for the weather icon
  const imgLink: string = `http://openweathermap.org/img/wn/${
    weather && weather?.list?.length ? weather.list[0].weather[0].icon : ""
  }.png`;

  return (
    <div className="weather_side">
      <div className="weather_gradient"></div>
      <div className="date_container">
        <h2 className="date_location">{weather?.city?.name}</h2>
        <h3 className="date_dayname">{weekday}</h3>
        <h5 className="date_day">{todayDate}</h5>
      </div>
      <div className="weather_container">
        <img
          className="weather_image"
          src={imgLink}
          alt={weather?.list[0]?.main?.temp + "°"}
        />
        <h1 className="weather_temp">{weather?.list[0]?.main?.temp + "°"}</h1>
      </div>
    </div>
  );
};

export default WeatherSide;
