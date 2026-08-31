import Back from "../components/back"
import Clues from "../components/clues"
import CrosswordPuzzle from "../components/crosswordPuzzle"
import GenerateButton from "../components/generateButton"
import { useState } from "react"

export default function Crossword({callback, backButtonCallback, wordObjects}) {
    console.log(wordObjects)
    const [crosswordState, setCrosswordState] = useState([])

    function clueClickCallback () {

    }

    function resetDataCallback () {
        setCrosswordState([])
    }

    return <main className="main crossword-main">
        {/* back, h1, top text */}
        <div className="crossword-top">
            <div>
                <Back backButtonCallback={backButtonCallback}></Back>
                <div className="crossword-top-flex"></div>
                <h1>Random Crosswords</h1>
            </div>
            <GenerateButton resetDataCallback={resetDataCallback} callback={callback}></GenerateButton>
        </div>
 
        {/* flexbox with crossword clues */}
        <div className="crossword-clues-container">
            <CrosswordPuzzle crosswordState={crosswordState} setCrosswordState={setCrosswordState} wordObjects={wordObjects}></CrosswordPuzzle>
            <div className="clues">
                <Clues clueClickCallback={clueClickCallback} direction="across" wordObjects={wordObjects}></Clues>
                <Clues clueClickCallback={clueClickCallback} direction="down" wordObjects={wordObjects}></Clues>
            </div>
        </div>
    </main>
}