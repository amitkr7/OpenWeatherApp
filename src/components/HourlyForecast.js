import React from 'react'

const HourlyForecast = ({ hourlyForecast }) => {
  function createDate(dt) {
    var day = new Date(dt * 1000)

    return day.toLocaleString('en-us', { timeStyle: 'short' })
  }
  return (
    <div className='card'>
      <div className='center'>
        <h3>Hourly Forecast</h3>
      </div>
      <div className='right strong'>
        <i className='fas fa-cloud-sun-rain'></i>
        <span>Hours</span>
        <span>Temperature</span>
        <span>Humidity</span>
        <span>Pressure</span>
        <span>Wind Speed</span>
      </div>

      {hourlyForecast.map((eachHour, idx) => {
        return (
          <div key={idx} className='right'>
            <i className='fas fa-cloud-sun-rain'></i>
            <span>{createDate(eachHour.dt)}</span>
            <span>{eachHour.temp} °C</span>
            <span>{eachHour.humidity} %</span>
            <span>{eachHour.pressure} hPa</span>
            <span>{eachHour.wind_speed} m/s</span>
          </div>
        )
      })}
    </div>
  )
}

export default HourlyForecast
