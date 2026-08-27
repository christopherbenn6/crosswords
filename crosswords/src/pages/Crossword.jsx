import Back from "../components/back"
import Clues from "../components/clues"
import CrosswordPuzzle from "../components/crosswordPuzzle"
import GenerateButton from "../components/generateButton"

export default function Crossword({backButtonCallback, wordObjects}) {
    console.log(wordObjects)
    function clueClickCallback () {

    }

    return <main className="main crossword-main">
        {/* back, h1, top text */}
        <div className="crossword-top">
            <div>
                <Back backButtonCallback={backButtonCallback}></Back>
                <div className="crossword-top-flex"></div>
                <h1>Random Crosswords</h1>
            </div>
            <GenerateButton wordObjects={wordObjects}></GenerateButton>
        </div>
 
        {/* flexbox with crossword clues */}
        <div className="crossword-clues-container">
            <CrosswordPuzzle wordObjects={wordObjects}></CrosswordPuzzle>
            <div className="clues">
                <Clues clueClickCallback={clueClickCallback} direction="across" wordObjects={wordObjects}></Clues>
                <Clues clueClickCallback={clueClickCallback} direction="down" wordObjects={wordObjects}></Clues>
            </div>
        </div>
    </main>
}