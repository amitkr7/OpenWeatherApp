import React from 'react'

const DailyForecast = ({ dailyForecast }) => {
  function createDate(dt) {
    var day = new Date(dt * 1000)

    return day.toLocaleString('en-us', {
      weekday: 'short',
    })
  }
  return (
    <div className='card'>
      <div className='center'>
        <h3>Daily Forecast</h3>
      </div>
      <div className='right strong'>
        <i className='fas fa-cloud-sun-rain'></i>
        <span>Days</span>
        <span>Temperature</span>
        <span>Humidity</span>
        <span>Pressure</span>
        <span>Wind Speed</span>
      </div>

      {dailyForecast.map((eachDay, idx) => {
        return (
          <div key={idx} className='right'>
            <i className='fas fa-cloud-sun-rain'></i>
            <span>{createDate(eachDay.dt)}</span>
            <span>{eachDay.temp.day} °C</span>
            <span>{eachDay.humidity} %</span>
            <span>{eachDay.pressure} hPa</span>
            <span>{eachDay.wind_speed} m/s</span>
          </div>
        )
      })}
    </div>
  )
}

export default DailyForecast
