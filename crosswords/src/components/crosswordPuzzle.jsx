import { useState } from "react";
import { useRef } from "react";
import CrosswordCell from "./crosswordCell";

export default function CrosswordPuzzle ({wordObjects}) {
    console.log(wordObjects)
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

    function zoomIn () {
        setZoom(current => Math.min(current + 0.1, 3))
    }

    function zoomOut () {
        setZoom(current => Math.max(current - 0.1, 0.5))
    }

    function wheelHandler(e) {
        e.preventDefault();

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

    return <div className="crossword">
        <div className="crossword-viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={wheelHandler}
        >
            <div className="cell-container" style={{ 
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
                { wordObjects.map(object => {
                    return object.letters.map(letter => {
                        return (<CrosswordCell xpos={letter.XPos} ypos={letter.YPos} letter={letter.letter}></CrosswordCell>)
                    })
                })  

                }
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