import React, {useState, useEffect} from "react";
import moment from 'moment';
// import { Link } from 'react-router-dom';

import ToDoList from "../components/home/ToDoList";
import Weather from "../components/home/Weather";

const HomePage = props => {
  const [nowTime, setNowTime] = useState(moment().format("HH : mm : ss"));

  useEffect(() => {
    setInterval(getTime, 1000);
  }, []);

  const dateBuilder = (d) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fir", "Sat"];

    let year = d.year();
    let month = months[d.month()];
    let date = d.date();
    let day = days[d.days()];

    return `${day} ${date} ${month} ${year}`;
  }

  const getTime = () => {
    const time = moment();
    const hours = time.hours();
    const minutes = time.minutes();
    const seconds = time.seconds();
    
    setNowTime(`${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`);
  }

  return (
    <>
      <div>
        <h1>to do list</h1>
        <h3>{ dateBuilder(moment()) }</h3>
        <div className="js_clock">
          <h2 className="clock_tit">{ nowTime }</h2>
        </div>
        <ToDoList />
      </div>
      <Weather />
      {/* <ul>
        <Link to="/login"><li>링크 로그인 페이지</li></Link>
      </ul> */}
    </>
  );
}

export default HomePage;