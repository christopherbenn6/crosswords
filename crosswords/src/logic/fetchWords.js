export function getAllWords() {
    return fetch("../assets/words.json")
    .then(res => res.json())
    .then(data => console.log(data))
}