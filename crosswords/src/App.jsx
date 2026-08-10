import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { createCrosswordData } from './logic/crossword'

createCrosswordData(1, 10);

function App() {
  const [count, setCount] = useState(0)

  return <>
    
  </>
}

export default App
