export default function Back({backButtonCallback}) {
    return <button className="back-button" onClick={backButtonCallback}>
        ← Back
    </button>
}