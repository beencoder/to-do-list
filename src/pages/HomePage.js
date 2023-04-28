import React, {useState, useEffect} from "react";
import moment from 'moment';
// import { Link } from 'react-router-dom';

import ToDoList from "../components/home/ToDoList";
import Weather from "../components/home/Weather";
import "../styles/HomePage.scss";

const HomePage = props => {
  const [nowTime, setNowTime] = useState(moment().format("HH : mm : ss"));

  useEffect(() => {
    setInterval(getTime, 1000);
  }, []);

  const dateBuilder = (d) => {
    let days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    let month = d.month() + 1;
    let day = days[d.days()];

    return `${d.year()}년 ${month}월 ${d.date()}일 ${day}`;
  }

  const getTime = () => {
    const time = moment();
    const hours = time.hours();
    const minutes = time.minutes();
    const seconds = time.seconds();
    
    setNowTime(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
  }

  return (
    <div className="wrap">
      <div className="inner">
        <h1 className="title">to do list</h1>
        <div className="contents">
          <ToDoList dateBuilder={dateBuilder} nowDate={moment()} nowTime={nowTime} />
          <Weather />
        </div>
      </div>
    </div>
  );
}

export default HomePage;