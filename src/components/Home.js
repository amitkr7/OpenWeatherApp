import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dotenv from 'dotenv'
import useLocation from '../useLocation'
import Loader from './Loader'
import CurrentWeather from './CurrentWeather'
import Error from './Error'
import HourlyForecast from './HourlyForecast'
import DailyForecast from './DailyForecast'
import CityWeather from './CityWeather'

function Home() {
  const [lat, lon, errorMessage] = useLocation()
  const [currentTemp, setCurrentTemp] = useState('')
  const [humidity, setHumidity] = useState('')
  const [pressure, setPressure] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [hourlyForecast, setHourlyForecast] = useState([])
  const [dailyForecast, setDailyForecast] = useState([])

  dotenv.config()

  let content

  const fetchWeather = async (lat, lon) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${process.env.REACT_APP_API_ID}`
    )

    if (!data) return

    setCurrentTemp(data.current.temp)
    setHumidity(data.current.humidity)
    setPressure(data.current.pressure)
    setWindSpeed(data.current.wind_speed)
    setHourlyForecast(data.hourly)
    setDailyForecast(data.daily)
  }

  useEffect(() => {
    if (lat && lon) {
      fetchWeather(lat, lon)
    }
  }, [lat, lon])

  if (errorMessage) {
    content = <Error message={errorMessage} />
  } else if (lat || lon) {
    content = (
      <>
        <CityWeather />
        <CurrentWeather
          currentTemp={currentTemp}
          humidity={humidity}
          pressure={pressure}
          windSpeed={windSpeed}
        />
        <HourlyForecast hourlyForecast={hourlyForecast} />
        <DailyForecast dailyForecast={dailyForecast} />
      </>
    )
  } else {
    content = <Loader message='Please allow access to location' />
  }

  return <div className='container display'>{content}</div>
}

export default Home
