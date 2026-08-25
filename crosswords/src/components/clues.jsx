import SingleClue from "./singleClue"

export default function Clues ({direction, wordObjects}) {
    return <section>
        { direction === "across" && (
            <>
                <h2><span>→</span> ACROSS</h2>
                <ul>
                    { wordObjects.map((wordObject) => {
                        if(wordObject.direction === "across") {
                            return (<SingleClue key={wordObjects.indexOf(wordObject)} clue={wordObject.clue} number={wordObject.clueNumber}></SingleClue>)
                        }
                    })}
                </ul>
            </>
        )}
        { direction === "down" && (
            <>
                <h2><span>↓</span> DOWN</h2>
                <ul>
                {wordObjects.map((wordObject) => {
                    if(wordObject.direction === "down") {
                        return (<SingleClue clue={wordObject.clue} number={wordObject.clueNumber}></SingleClue>)                 
                    }
                })}
                </ul>
            </>
        )}
    </section>
}