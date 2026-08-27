export default function CrosswordCell ({letter, xpos, ypos}) {
    function highlight () {

    }

    return <p style={{
        top: `${ypos * 35}px`,
        left: `${xpos * 35}px`
    }}  
    className="cell" 
    onClick={e => highlight()}>
        {letter}
    </p>
}