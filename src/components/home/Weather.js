import { useState, useEffect } from "react";
import axios from "axios";

const Weather = props => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const api = {
    key: "054c90121b875d26c93c0bd2e63a094b",
    base: "https://api.openweathermap.org/data/2.5"
  };

  useEffect(() => {
    // 위치 정보 가져오기
    const getCoordsAndWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              // 좌표를 얻은 직후 API 호출
              const url = `${api.base}/weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`;
              const res = await axios.get(url);
              const data = res.data;

              setWeather({
                temp: data.main.temp.toFixed(1),
                humidity: data.main.humidity,
                main: data.weather[0].main,
                city: data.name,
                icon: data.weather[0].icon
              });
              setLoading(false);
            } catch (error) {
              console.error("날씨 정보를 가져오는데 실패했습니다.", error);
              setLoading(false);
            }
          },
          (error) => {
            console.error("위치 정보 공유를 거부하셨거나 오류가 발생했습니다.", error);
            setLoading(false);
          }
        );
      }
    };

    getCoordsAndWeather();
  }, []);

  if (loading) return <div className="weatherWrap">날씨 정보를 불러오는 중...</div>;
  if (!weather) return <div className="weatherWrap">위치 정보 권한을 허용해주세요.</div>;

  return (
    <div className="weatherWrap">
      <div className="content">
        <strong className="tit">오늘의 {weather.city} 날씨는? {weather.main}</strong>
        <img 
          className="weatherImg" 
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt="weather_icon" 
        />
      </div>
      <div className="content">
        <span className="text">💧 현재습도: {weather.humidity}%</span>
        <span className="text">🌡️ 현재기온: {weather.temp}℃</span>
      </div>
    </div>
  )
}

export default Weather;