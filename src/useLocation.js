import { useEffect, useState } from 'react'

const useLocation = () => {
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
      },
      (err) => {
        setErrorMessage(err.message)
      }
    )
  }, [])

  return [lat, lon, errorMessage]
}

export default useLocation
