import { useState } from 'react'
import './App.css'
import { createCrosswordData } from './logic/crossword'
import Button from './components/generateButton.jsx'

const difficulty = 1;
const wordCount = 10;

let crosswordData = createCrosswordData(difficulty, wordCount);

function App() {
  const [count, setCount] = useState(0)

  return <>
    <main className="main">
      <h1><span>Random</span> Crosswords</h1>
      <Button></Button>
    </main>
    <footer>

    </footer>
  </>
}

export default App
