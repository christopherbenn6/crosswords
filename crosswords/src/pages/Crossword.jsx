import Back from "../components/back"
import Clues from "../components/clues"
import GenerateButton from "../components/generateButton"

export default function Crossword({backButtonCallback, wordObjects}) {
    return <main className="main crossword-main">
        {/* back, h1, top text */}
        <div className="crossword-top">
            <div>
                <Back backButtonCallback={backButtonCallback}></Back>
                <div className="crossword-top-flex"></div>
                <h1>Random Crosswords</h1>
            </div>
            <GenerateButton></GenerateButton>
        </div>

        {/* flexbox with crossword clues */}
        <div className="crossword-clues-container">
            <Clues direction="across" wordObjects={wordObjects}></Clues>
            <Clues direction="down" wordObjects={wordObjects}></Clues>
        </div>
    </main>
}