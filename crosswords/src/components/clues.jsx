export default function Clues ({direction}) {
    return <section>
        { direction === "across" && (
            <h2><span>→</span> ACROSS</h2>
        )} 
        { direction === "down" && (
            <h2><span>→</span> DOWN</h2>
        )}
    </section>
}