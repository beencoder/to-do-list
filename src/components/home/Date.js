import moment from "moment";
import "moment/locale/ko"; 

const Date = ({ nowTime }) => { 
  const now = moment();
  const dateStr = now.format("YYYY년 M월 D일");
  const dayStr = now.format("dddd");

  return (
    <div className="dateWrap">
      <p className="date">
        <strong>{dateStr}</strong> {dayStr} {nowTime}
      </p>
    </div>
  );
};

export default Date;