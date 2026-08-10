import words from "../assets/words.json"
console.log(words)
/**
 * @param {int} difficulty - Interger from 1 to 3
 * @param {int} wordCount - 
 */
export async function createCrosswordData(difficulty, wordCount) {
    // Maximum dimensions of the crossword puzzle
    const gridHeight = 30;
    const gridWidth = 30;

    let crosswordState = {
        words: [
            {
                word: "cheexe",
                direction: "across",
                letters: [
                    {
                        letter: "c",
                        XPos: 7,
                        YPos: 17
                    },
                    {
                        letter: "h",
                        XPos: 8,
                        YPos: 17
                    },
                    {
                        letter: "x",
                        XPos: 11,
                        YPos: 17
                    }
                ] 
            },
            {
                word: "ballx",
                direction: "down",
                letters: [
                    {
                        letter: "x",
                        XPos: 11,
                        YPos: 17
                    },
                    {
                        letter: "b",
                        XPos: 6,
                        YPos: 21
                    }
                ] 
            }
        ],

    };
    getRandomWordObject(difficulty, crosswordState.words);
    // for(let i = wordCount; i > 0; i--) {
    //     crosswordState.words += getRandomWordObject(difficulty, crosswordState.words);
    // }
    // console.log(crosswordState.words)
}

/**
 * 
 * @param {int} difficulty - Interger from 1 to 3
 * @param {Object} crosswordState 
 */
function getRandomWordObject(difficulty, crosswordStateWords) {
    const allLetters = getAllLetterPositions(crosswordStateWords);
    const randLetter = allLetters[getRandomRange(0, allLetters.length - 1)]
    console.log(randLetter);

    // Filter the words that contain the random letter
    const wordsThatContainRandLetter = words.filter(wordObject =>
    wordObject.word
        .toLowerCase()
        .includes(randLetter.letter.toLowerCase())
    );
    console.log(wordsThatContainRandLetter);
}

function getAllLetterPositions(crosswordStateWords) {
    // Create an array of every letter and it's positions
    let allLetterPositions = [];

    // For each word object
    crosswordStateWords.forEach(wordObject => {

        // For each letter (letters: [])
        wordObject.letters.forEach(letter => {
            // Does this letter already exist in the array?
            const existingLetter = allLetterPositions.find(
                position =>
                    position.XPos === letter.XPos &&
                    position.YPos === letter.YPos
            );

            if(!existingLetter) {
                allLetterPositions.push(letter)
            }
        });
    });
    console.log(allLetterPositions);
    return allLetterPositions;
}

/**
 * 
 */
function getRandomWord (difficulty) {

}

/**
 * 
 * @param {int} min - Minimum number, inclusive
 * @param {int} max - Maximum number, inclusive
 * @returns {int} - Random number between the two inputs
 */
function getRandomRange(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * @returns {boolean}
 */
function isValidWord() {

}