import React from "react";

const Date = props => { 
  const { dateBuilder, nowDate, nowTime } = props;
  return (
    <p className="date">{dateBuilder(nowDate)} {nowTime}</p>
  )
}

export default Date;