import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Loading from "./components/Loading";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [Temperature, setTemperature] = useState();

  useEffect(() => {
    //funcion que ejecuta cuando llega la funcion
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoords(obj);
    };
    // llama la api del navegador para usar la ubicacion actual
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  console.log(coords);

  //------- peticion del clima---

  useEffect(() => {
    if (coords) {
      const APIKEY = "a16afaa93ebae2ddbc82edaee5d26a36";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`;
      axios
        .get(URL)
        .then((res) => {
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const farenheit = ((celsius * 9) / 5 + 32).toFixed(1);
          setTemperature({ celsius, farenheit });
          setWeather(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  return (
    <div className="App">
      {weather ? (
        <WeatherCard weather={weather} Temperature={Temperature} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
