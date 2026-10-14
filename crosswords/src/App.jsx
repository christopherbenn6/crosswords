import { useState } from 'react'
import './reset.css'
import './App.css'
import { createCrosswordData } from './logic/crossword'
import Home from './pages/Home'
import Crossword from './pages/Crossword'
import { motion } from 'motion/react'

function App() {

  const [difficulty, setDifficulty] = useState(1)
  const [wordCount, setWordCount] = useState(10)
  const [view, setView] = useState("home");
  const [crosswordData, setCrosswordData] = useState({});

  async function generateCallback(wordCount, difficulty) {
    // Set Values for Later
    setDifficulty(difficulty);
    setWordCount(wordCount);

    let crosswordData = await createCrosswordData(difficulty, wordCount);
    setCrosswordData(crosswordData)
    setView("crossword")

    console.log(crosswordData)
  }

  function backButtonCallback() {
    setView("home")
  }

  return <>
  { view === "home" && (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
    >
      <Home callback={generateCallback}></Home>
    </motion.div>
  )}

  { view === "crossword" && (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      exit={{opacity:0}}
    >
      <Crossword difficulty={difficulty} wordCount={wordCount} callback={generateCallback} backButtonCallback={backButtonCallback} wordObjects={crosswordData.words}></Crossword>
    </motion.div>
  )}
    
  </>
}

export default App
