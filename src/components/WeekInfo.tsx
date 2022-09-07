import { Weather } from "../utils/types";

//this is the component for displaying the short details about the weather for the next 4 days
interface Props {
  weather: Weather;
}

const WeekInfo = ({ weather }: Props): JSX.Element => {
  const weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today: number = new Date().getDay();

  return (
    <ul className="week_list">
      {weather?.daily?.slice(1, 5).map((day, idx) => {
        //we only need the next 4 days, not including today, so we slice the array from index 1
        return (
          <li className="day" key={idx}>
            <div className="day_name">{weekDays[(today + idx + 1) % 7]}</div>
            <div className="day_temp">{day?.temp?.day + "°"}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default WeekInfo;
