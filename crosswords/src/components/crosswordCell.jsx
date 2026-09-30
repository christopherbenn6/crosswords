export default function CrosswordCell({letterObject, letter, xpos, ypos, clueNumber, selected, wordSelected, callback}) {
    return (
        <div className="clue-number-container">
            <p
                style={{
                    top: `${ypos * 35}px`,
                    left: `${xpos * 35}px`
                }}
                className={`cell ${wordSelected ? "word-selected-cell" : ""} ${selected ? "selected-cell" : ""}`}
                onClick={e => callback(letterObject)}
            >
                {   clueNumber !== "" && (
                    <span className="clue-number">{clueNumber ?? ""}</span>
                )}
                
                <span className="letter">{letter ?? ""}</span>
            </p>
        </div>
    );
}