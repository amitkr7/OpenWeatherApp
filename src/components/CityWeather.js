import React, { useState, useEffect } from 'react'
import dotenv from 'dotenv'
import axios from 'axios'
import CurrentWeather from './CurrentWeather'

const CityWeather = ({ city }) => {
  const [currentTemp, setCurrentTemp] = useState('')
  const [humidity, setHumidity] = useState('')
  const [pressure, setPressure] = useState('')
  const [windSpeed, setWindSpeed] = useState('')

  dotenv.config()

  const cityWeather = async (city) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_ID}`
    )

    if (!data) return

    setCurrentTemp(data.main.temp)
    setHumidity(data.main.humidity)
    setPressure(data.main.pressure)
    setWindSpeed(data.wind.speed)
  }
  useEffect(() => {
    if (city) {
      cityWeather(city)
    }
  }, [city])

  return (
    <CurrentWeather
      currentTemp={currentTemp}
      humidity={humidity}
      pressure={pressure}
      windSpeed={windSpeed}
    />
  )
}

export default CityWeather
