import Back from "../components/back"
import Clues from "../components/clues"
import CrosswordPuzzle from "../components/crosswordPuzzle"
import GenerateButton from "../components/generateButton"
import { useState } from "react"

export default function Crossword({callback, backButtonCallback, wordObjects}) {
    const [crosswordState, setCrosswordState] = useState([])
    const [selectedLetter, setSelectedLetter] = useState(null)
    const [selectedLetterDirection, setSelectedLetterDirection] = useState(null)

function isPuzzleCorrect() {
    let letterObjects = [];
    let isCorrect;

    wordObjects.forEach(object => {
        object.letters.forEach(letterObject => {

            if (!letterObjects.some(letter =>
                letter.XPos === letterObject.XPos &&
                letter.YPos === letterObject.YPos
            )) {
                letterObjects.push({
                    XPos: letterObject.XPos,
                    YPos: letterObject.YPos,
                    letter: letterObject.letter.toUpperCase()
                });
            }
        });
    });

    if (letterObjects.length !== crosswordState.length) {
        isCorrect = false;
    }

    isCorrect = letterObjects.every(letter =>
        crosswordState.some(stateLetter =>
            stateLetter.XPos === letter.XPos &&
            stateLetter.YPos === letter.YPos &&
            stateLetter.letter.toUpperCase() === letter.letter
        )
    );

    if(isCorrect) {
        console.log("SUCCESS")
    }

    return isCorrect;
}

    function clueClickCallback (direction, clueNumber) {
        const selectedWordObject = wordObjects.find(object => {
            return object.clueNumber == clueNumber && object.direction == direction
        })
        setSelectedLetter(selectedWordObject.letters[0]);
        setSelectedLetterDirection(direction)
    }

    function resetDataCallback () {
        setCrosswordState([])
    }

    return <main className="main crossword-main">
        {/* back, h1, top text */}
        <div className="crossword-top">
            <div>
                <Back backButtonCallback={backButtonCallback}></Back>
                <div className="crossword-top-flex">
                    <div className="single-crossword-top-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" />
                        </svg>
                        Difficulty
                    </div>
                    <div className="single-crossword-top-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7.491 5.992a.75.75 0 0 1 .75-.75h12a.75.75 0 1 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM7.49 11.995a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM7.491 17.994a.75.75 0 0 1 .75-.75h12a.75.75 0 1 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.24 3.745a.75.75 0 0 1 .75-.75h1.125a.75.75 0 0 1 .75.75v3h.375a.75.75 0 0 1 0 1.5H2.99a.75.75 0 0 1 0-1.5h.375v-2.25H2.99a.75.75 0 0 1-.75-.75ZM2.79 10.602a.75.75 0 0 1 0-1.06 1.875 1.875 0 1 1 2.652 2.651l-.55.55h.35a.75.75 0 0 1 0 1.5h-2.16a.75.75 0 0 1-.53-1.281l1.83-1.83a.375.375 0 0 0-.53-.53.75.75 0 0 1-1.062 0ZM2.24 15.745a.75.75 0 0 1 .75-.75h1.125a1.875 1.875 0 0 1 1.501 2.999 1.875 1.875 0 0 1-1.501 3H2.99a.75.75 0 0 1 0-1.501h1.125a.375.375 0 0 0 .036-.748H3.74a.75.75 0 0 1-.75-.75v-.002a.75.75 0 0 1 .75-.75h.411a.375.375 0 0 0-.036-.748H2.99a.75.75 0 0 1-.75-.75Z" />
                        </svg>
                        Word Count
                    </div>
                </div>
                <h1>Random Crosswords</h1>
            </div>
        </div>
 
        {/* flexbox with crossword clues */}
        <div className="crossword-clues-container">
            <CrosswordPuzzle isPuzzleCorrect={isPuzzleCorrect} crosswordState={crosswordState} setCrosswordState={setCrosswordState} wordObjects={wordObjects} selectedLetterFromClues={selectedLetter} selectedLetterDirection={selectedLetterDirection}></CrosswordPuzzle>
            <div className="clues">
                <Clues clueClickCallback={clueClickCallback} direction="across" wordObjects={wordObjects}></Clues>
                <Clues clueClickCallback={clueClickCallback} direction="down" wordObjects={wordObjects}></Clues>
            </div>
        </div>
    </main>
}