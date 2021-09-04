import React from 'react'

const CurrentWeather = ({ currentTemp, humidity, pressure, windSpeed }) => {
  return (
    <div className='card'>
      <div className='center'>
        <h3>Current Weather</h3>
      </div>

      <div className='right'>
        Temperature
        <i className='fa fa-temperature-high'></i>
        <span>{currentTemp} °C</span>
      </div>
      <div className='right'>
        Humidity
        <i className='fas fa-cloud-sun-rain'></i>
        <span>{humidity} %</span>
      </div>
      <div className='right'>
        Pressure
        <i className='fas fa-compress-arrows-alt'></i>
        <span>{pressure} hPa</span>
      </div>
      <div className='right'>
        WindSpeed
        <i className='fas fa-wind'></i>
        <span>{windSpeed} m/s </span>
      </div>
    </div>
  )
}

export default CurrentWeather
