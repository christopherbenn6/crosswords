export default function SingleClue ({clue, direction, number, clueClickCallback}) {
    return <li onClick={e => clueClickCallback(direction, number)} className="single-clue"><span>{number}</span>{clue}</li>
}