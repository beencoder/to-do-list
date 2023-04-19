import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = props => {
  const [weather, setWeather] = useState("");
  const [coords, setCoords] = useState({lat: 0, lon: 0});
  const api = {
    key: "054c90121b875d26c93c0bd2e63a094b",
    base: "https://api.openweathermap.org/data/2.5"
  };
  const url = `${api.base}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${api.key}`;

  useEffect(() => {
    getCoords();

    axios.get(url).then((res) => {
      const data = res.data;
      setWeather({
        temp: (data.main.temp - 273.15).toFixed(1),
        humidity: data.main.humidity,
        main: data.weather[0].main,
        city: data.name,
        icon: data.weather[0].icon
      })
      // console.log(JSON.stringify(data, null, 4))
  document.cookie = "crossCookie=bar; SameSite=None; Secure";

    })
  }, [url])

  const getCoords = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      setCoords({ lat: lat, lon: lon });
    })
  }

  return (
    <div className="js_weather">
      <h3> Today's { weather.city } weather...</h3>
      <p>
        오늘의 날씨:&nbsp;<img src={(`http://openweathermap.org/img/w/${weather.icon}.png`)} alt="weather_icon" />{weather.main}
      </p>
      <p>
        &#128167; 현재습도:&nbsp;{weather.humidity}
      </p>
      <p>
          &#127773; 현재기온:&nbsp;{weather.temp}℃
      </p>
    </div>
  )
}

export default Weather;