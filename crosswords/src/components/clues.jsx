import SingleClue from "./singleClue"

export default function Clues ({direction, wordObjects, clueClickCallback}) {
    return <section className="across-down-clues">
        { direction === "across" && (
            <>  
                <div className="clues-top">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>

                    <h2> ACROSS</h2>
                </div>
                <ul className="clue-list">
                    { wordObjects.map((wordObject) => {
                        if(wordObject.direction === "across") {
                            return (<SingleClue clueClickCallback={clueClickCallback} key={wordObjects.indexOf(wordObject)} clue={wordObject.clue} number={wordObject.clueNumber}></SingleClue>)
                        }
                    })}
                </ul>
            </>
        )}
        { direction === "down" && (
            <>
                <div className="clues-top">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
                    <h2>DOWN</h2>
                </div>
                <ul className="clue-list">
                {wordObjects.map((wordObject) => {
                    if(wordObject.direction === "down") {
                        return (<SingleClue clueClickCallback={clueClickCallback} key={wordObjects.indexOf(wordObject)} clue={wordObject.clue} number={wordObject.clueNumber}></SingleClue>)                 
                    }
                })}
                </ul>
            </>
        )}
    </section>
}