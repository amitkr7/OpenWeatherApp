import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dotenv from 'dotenv'
import useLocation from './useLocation'
import Loader from './components/Loader'
import CurrentWeather from './components/CurrentWeather'
import Error from './components/Error'

function App() {
  const [lat, lon, errorMessage] = useLocation()
  const [currentTemp, setCurrentTemp] = useState('')
  const [humidity, setHumidity] = useState('')
  const [pressure, setPressure] = useState('')
  const [windSpeed, setWindSpeed] = useState('')

  dotenv.config()

  let content

  const fetchWeather = async (lat, lon) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,daily&appid=${process.env.REACT_APP_API_ID}`
    )

    if (!data) return

    setCurrentTemp(data.current.temp)
    setHumidity(data.current.humidity)
    setPressure(data.current.pressure)
    setWindSpeed(data.current.wind_speed)
  }

  useEffect(() => {
    fetchWeather(lat, lon)
  }, [lat, lon])

  if (errorMessage) {
    content = <Error message={errorMessage} />
  } else if (lat || lon) {
    content = (
      <CurrentWeather
        currentTemp={currentTemp}
        humidity={humidity}
        pressure={pressure}
        windSpeed={windSpeed}
      />
    )
  } else {
    content = <Loader message='Please allow access to location' />
  }

  return <div className='container display'>{content}</div>
}

export default App
