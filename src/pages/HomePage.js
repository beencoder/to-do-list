import React, {useState, useEffect} from "react";
import moment from 'moment';
// import { Link } from 'react-router-dom';

import ToDoList from "../components/home/ToDoList";
import Weather from "../components/home/Weather";
import "../styles/HomePage.scss";

const HomePage = props => {
  const [nowTime, setNowTime] = useState(moment().format("HH : mm : ss"));

  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(moment().format("HH : mm : ss"));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="wrap">
      <div className="inner">
        <h1 className="title">to do list</h1>
        <div className="contents">
          <ToDoList nowTime={nowTime} />
          <Weather />
        </div>
      </div>
    </div>
  );
}

export default HomePage;