import React, { useState } from 'react'

import Home from './components/Home'

const App = () => {
  const [theme, setTheme] = useState('light')
  const [themeName, setThemeName] = useState('Dark')

  const handleClick = () => {
    if (theme === 'light') {
      setTheme('dark')
      setThemeName('Light')
    } else {
      setTheme('light')
      setThemeName('Dark')
    }
  }

  return (
    <div className={theme}>
      <button onClick={() => handleClick()} className={`btn left ${theme}`}>
        {themeName}
      </button>
      <Home />
    </div>
  )
}

export default App
