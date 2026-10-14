import { use, useState, useEffect } from "react";
import { useRef } from "react";
import CrosswordCell from "./crosswordCell";

export default function CrosswordPuzzle({ isPuzzleCorrect, wordObjects, crosswordState, setCrosswordState, selectedLetterFromClues, selectedLetterDirection }) {
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [selectedWord, setSelectedWord] = useState(null);
    const [selectedWordDirection, setSelectedWordDirection] = useState('across');
    const viewportRef = useRef(null);
    const mobileInputRef = useRef(null);

    useEffect(() => {
        if (selectedLetterFromClues) {
            const word = wordObjects.find(object => {
                return object.letters.find(letter => {
                    return letter === selectedLetterFromClues
                        && object.direction == selectedLetterDirection
                })
            })
            setSelectedLetter(selectedLetterFromClues);
            setSelectedWord(word);
            viewportRef.current?.focus();
            mobileInputRef.current?.focus();

        }
    }, [selectedLetterFromClues, selectedLetterDirection, wordObjects]);

    function selectLetterHandler(letter) {
    setSelectedLetter(letter);

    let possibleWords = [];

    wordObjects.forEach((wordObject) => {
        if (wordObject.letters.includes(letter)) {
            possibleWords.push(wordObject);
        }
    });

    if (possibleWords.length > 1) {
        let wordObject = possibleWords.find(
            (word) => word.direction === selectedWordDirection
        );

        setSelectedWord(wordObject);
    } else {
        let wordObject = possibleWords[0];
        setSelectedWord(wordObject);
        setSelectedWordDirection(wordObject.direction);
    }

    // Open the mobile keyboard after the cell is tapped.
    mobileInputRef.current?.focus({ preventScroll: true });
}


    const [zoom, setZoom] = useState(1)
    const [pan, setPan] = useState({
        x: 0,
        y: 0
    });

    const [dragging, setDragging] = useState(false);

    const dragStart = useRef({
        x: 0,
        y: 0
    });

    const panStart = useRef({
        x: 0,
        y: 0
    });

    function zoomIn() {
        setZoom(current => Math.min(current + 0.1, 3))
    }

    function zoomOut() {
        setZoom(current => Math.max(current - 0.1, 0.5))
    }

    function wheelHandler(e) {
        const rect = e.currentTarget.getBoundingClientRect();

        // Mouse position inside the viewport
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const oldZoom = zoom;

        const newZoom = e.deltaY < 0
            ? Math.min(oldZoom + 0.1, 3)
            : Math.max(oldZoom - 0.1, 0.5);

        // Position of the point under the mouse before zoom
        const boardX = (mouseX - pan.x) / oldZoom;
        const boardY = (mouseY - pan.y) / oldZoom;

        // Keep that same point underneath the mouse
        setPan({
            x: mouseX - boardX * newZoom,
            y: mouseY - boardY * newZoom
        });

        setZoom(newZoom);
    }

    function handlePointerMove(e) {
        if (!dragging) return;

        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;

        setPan({
            x: panStart.current.x + dx,
            y: panStart.current.y + dy
        });
    }

    function handlePointerDown(e) {
        if (e.target.closest(".cell")) {
            return;
        }

        setDragging(true);

        dragStart.current = {
            x: e.clientX,
            y: e.clientY
        };

        panStart.current = {
            x: pan.x,
            y: pan.y
        };

        e.currentTarget.setPointerCapture(e.pointerId);
    }

    function handlePointerUp() {
        setDragging(false);
    }

    function handleLetterInput(letter) {
        if (!selectedLetter || !selectedWord) return;

        // Move your existing single-letter input logic here.
        // Replace e.key with letter.
        if (letter === "Backspace" || letter === "Delete") {
            let prevIndex = selectedWord.letters.indexOf(selectedLetter) - 1;
            let prevLetter = selectedWord.letters[prevIndex];
            let isCurrentLetterFilled = crosswordState.some(
                letterObject =>
                    letterObject.XPos === selectedLetter.XPos &&
                    letterObject.YPos === selectedLetter.YPos
            )
            if (prevLetter && !isCurrentLetterFilled) {
                selectLetterHandler(prevLetter);
            } else if (!prevLetter) {
                return;
            }


            setCrosswordState(current => {

                // Filter out the current position, to then replace it

                if (isCurrentLetterFilled) {
                    return current.filter(
                        letter =>
                            !(
                                letter.XPos === selectedLetter.XPos &&
                                letter.YPos === selectedLetter.YPos
                            )
                    );
                } else {
                    return current.filter(
                        letter =>
                            !(
                                letter.XPos === selectedWord.letters[prevIndex].XPos &&
                                letter.YPos === selectedWord.letters[prevIndex].YPos
                            )
                    );
                }

            });
        }

        setCrosswordState(current => {

            // Filter out the current position, to then replace it
            const newState = current.filter(
                letter =>
                    !(
                        letter.XPos === selectedLetter.XPos &&
                        letter.YPos === selectedLetter.YPos
                    )
            );

            newState.push({
                XPos: selectedLetter.XPos,
                YPos: selectedLetter.YPos,
                letter: letter.toUpperCase()
            });

            return newState;
        });

        let nextIndex = selectedWord.letters.indexOf(selectedLetter) + 1;

        while (
            selectedWord.letters[nextIndex] &&
            crosswordState.some(
                letterObject =>
                    letterObject.XPos === selectedWord.letters[nextIndex].XPos &&
                    letterObject.YPos === selectedWord.letters[nextIndex].YPos
            )
        ) {
            nextIndex++;
        }

        const nextLetter = selectedWord.letters[nextIndex];

        if (nextLetter) {
            selectLetterHandler(nextLetter);
        } else {
            // Deselect
            setSelectedLetter(null);
            setSelectedWord(null);
        }

    }

    function handleKeyDown(e) {
    if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault();
        handleLetterInput(e.key);
        return;
    }

    if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        handleLetterInput(e.key.toUpperCase());
    }
}

    return <div className="crossword">
        <input
            ref={mobileInputRef}
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            className="mobile-keyboard-input"
            aria-label="Enter crossword letter"
            onKeyDown={(e) => {
                if (e.key === "Backspace" || e.key === "Delete") {
                    e.preventDefault();
                    handleLetterInput(e.key);
                }
            }}
            onChange={(e) => {
                const value = e.target.value;

                if (value.length > 0) {
                    handleLetterInput(value.slice(-1).toUpperCase());
                    e.target.value = "";
                }
            }}
        />
        <div className="crossword-viewport"
            ref={viewportRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onWheel={wheelHandler}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div className="cell-container" style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
            }}>
                {wordObjects.map(object => {
                    return object.letters.map(letter => {

                        const isSelected =
                            selectedLetter?.XPos === letter.XPos &&
                            selectedLetter?.YPos === letter.YPos;

                        const isWordSelected =
                            selectedWord &&
                            selectedWord.letters.some(selectedWordLetter => selectedWordLetter === letter);

                        const textLetter = crosswordState.find(
                            inputLetter =>
                                inputLetter.XPos === letter.XPos &&
                                inputLetter.YPos === letter.YPos
                        ) ?? "";

                        return (
                            <CrosswordCell
                                key={letter.XPos + "-" + letter.YPos}
                                xpos={letter.XPos}
                                ypos={letter.YPos}
                                letterObject={letter}
                                letter={textLetter.letter}
                                clueNumber={object.letters[0] === letter ? object.clueNumber : ""}
                                selected={isSelected}
                                wordSelected={isWordSelected}
                                callback={selectLetterHandler}
                            />
                        );
                    });
                })}
            </div>

        </div>
        <div className="crossword-toolbar">
            <div className="zoom-controls">
                <svg onClick={zoomOut} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6" />
                </svg>
                <p>%{Math.round(zoom * 100)}</p>
                <svg onClick={zoomIn} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
                </svg>
            </div>
        </div>
    </div>
}