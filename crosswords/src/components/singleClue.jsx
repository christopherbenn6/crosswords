export default function SingleClue ({clue, number, clueClickCallback}) {
    return <li onClick={e => clueClickCallback(e.target)} className="single-clue"><span>{number}</span>{clue}</li>
}