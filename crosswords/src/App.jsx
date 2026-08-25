import { useState } from 'react'
import './reset.css'
import './App.css'
import { createCrosswordData } from './logic/crossword'
import Home from './pages/Home'
import Crossword from './pages/Crossword'

function App() {

  const [difficulty, setDifficulty] = useState(1)
  const [wordCount, setWordCount] = useState(10)
  const [view, setView] = useState("home");

  async function generateCallback(wordCount, difficulty) {
    // Set Values for Later
    setDifficulty(difficulty);
    setWordCount(wordCount);
    setView("crossword")

    let crosswordData = await createCrosswordData(difficulty, wordCount);
    console.log(crosswordData)
  }

  function backButtonCallback() {
    setView("home")
  }

  return <>
  { view === "home" && (
    <Home callback={generateCallback}></Home>
  )}

  { view === "crossword" && (
    <Crossword backButtonCallback={backButtonCallback}></Crossword>
  )}
    
  </>
}

export default App
