import { Weather, List } from "../utils/types";

//this is the component for displaying the best days to buy stuff
interface Props {
  weather: Weather;
}

interface BestDay {
  pop?: number;
  main?: {
    temp: number;
  };
  day: string;
}

const stats = ({ weather }: Props): JSX.Element => {
  const weekDays: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today: number = new Date().getDay();
  //openweather returns 40 days, we only need 5
  const days: List[] = weather?.list?.slice(0, 5);

  //selecting the day that has the biggest pop (chance of rain) and returning it
  const bestDayToSellUmbrella: BestDay = days?.reduce(
    (acc, day, idx) => {
      if (day.pop > acc.pop) {
        //we also hardcode the day name into the object, so that then we can use it in the component
        return { pop: day.pop, day: weekDays[(today + idx) % 7] };
      }
      return acc;
    },
    { pop: 0, day: "" }
  );

  //selecting the day that has the lowest temp and returning it
  const bestDayToBuyJacket: BestDay = days?.reduce(
    (acc, day, idx) => {
      if (day.main.temp < acc.main.temp) {
        //we also hardcode the day name into the object, so that then we can use it in the component
        return {
          main: { temp: day.main.temp },
          day: weekDays[(today + idx) % 7],
        };
      }
      return acc;
    },
    { main: { temp: 100 }, day: "" }
  );

  return (
    <div className="today-info">
      <div className="title">Best day to sell:</div>
      <div className="today_info_block">
        <span className="title">Jacket</span>
        <span className="value">{bestDayToBuyJacket?.day}</span>
      </div>
      <div className="today_info_block">
        <span className="title">Umbrella</span>
        <span className="value">{bestDayToSellUmbrella?.day}</span>
      </div>
    </div>
  );
};

export default stats;
