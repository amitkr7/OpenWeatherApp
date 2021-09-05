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
  const [city, setCity] = useState('')
  const [currentTemp, setCurrentTemp] = useState('')
  const [humidity, setHumidity] = useState('')
  const [pressure, setPressure] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [hourlyForecast, setHourlyForecast] = useState([])
  const [dailyForecast, setDailyForecast] = useState([])
  const [currentWeather, setCurrentWeather] = useState(false)
  const [hourlyWeather, setHourlyWeather] = useState(false)
  const [dailyWeather, setDailyWeather] = useState(false)

  dotenv.config()

  let content

  const fetchWeather = async (lat, lon) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${process.env.REACT_APP_API_ID}`
    )

    if (!data) return
    setCurrentWeather(true)
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

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleCurrent = () => {
    setCity('')
    setCurrentWeather(true)
    setHourlyWeather(false)
    setDailyWeather(false)
  }

  const handleHourly = () => {
    setCity('')
    setCurrentWeather(false)
    setHourlyWeather(true)
    setDailyWeather(false)
  }

  const handleDaily = () => {
    setCity('')
    setCurrentWeather(false)
    setHourlyWeather(false)
    setDailyWeather(true)
  }

  if (errorMessage) {
    content = <Error message={errorMessage} />
  } else if (city) {
    content = <CityWeather city={city} />
  } else if (currentWeather) {
    content = (
      <CurrentWeather
        currentTemp={currentTemp}
        humidity={humidity}
        pressure={pressure}
        windSpeed={windSpeed}
      />
    )
  } else if (hourlyWeather) {
    content = <HourlyForecast hourlyForecast={hourlyForecast} />
  } else if (dailyWeather) {
    content = <DailyForecast dailyForecast={dailyForecast} />
  } else {
    content = <Loader message='Please allow access to location' />
  }

  return (
    <div className='container display'>
      <div className='title'>
        <h2>openweather</h2>
        <div className='underline'></div>
      </div>

      <div className='btn-container'>
        <button className='btn' onClick={handleCurrent}>
          Current Weather
        </button>
        <button className='btn' onClick={handleHourly}>
          Hourly Forecast
        </button>
        <button className='btn' onClick={handleDaily}>
          Daily forecast
        </button>
      </div>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type='text'
          className='btn'
          onChange={(e) => handleChange(e)}
          placeholder='Enter City Name ...'
        />
      </form>
      {content}
    </div>
  )
}

export default Home
