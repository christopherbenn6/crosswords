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
                        letter: "e",
                        XPos: 9,
                        YPos: 17
                    },
                    {
                        letter: "e",
                        XPos: 10,
                        YPos: 17
                    },
                    {
                        letter: "s",
                        XPos: 11,
                        YPos: 17
                    },
                    {
                        letter: "e",
                        XPos: 12,
                        YPos: 17
                    },
                ] 
            },
            {
                word: "ballx",
                direction: "down",
                letters: [
                    {
                        letter: "b",
                        XPos: 11,
                        YPos: 13
                    },
                    {
                        letter: "a",
                        XPos: 11,
                        YPos: 14
                    },
                    {
                        letter: "l",
                        XPos: 11,
                        YPos: 15
                    },
                    {
                        letter: "l",
                        XPos: 11,
                        YPos: 16
                    },
                    {
                        letter: "s",
                        XPos: 11,
                        YPos: 17
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

    let randWord = getRandomWordFromArray(wordsThatContainRandLetter);
    let isVertical = checkIsVertical(crosswordStateWords, randLetter, allLetters);

    let wordObject = createWordObject(randWord, randLetter, isVertical)
    let isValid = isValidWord(wordObject, allLetters);
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
    console.log(["All Letter Positions",  allLetterPositions]);
    return allLetterPositions;
}

/**
 * 
 */
function getRandomWordFromArray (array) {
    return array[getRandomRange(0, array.length - 1)].word;
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
 * 
 * @param {string} word - The randomly chosen word
 * @param {object} letter - The random letter and location to place the word
 * @returns {boolean}
 */
function checkIsVertical (words, letter) {
    for (const word of words) {
        const matchingLetter = word.letters.find(
            l => l.XPos === letter.XPos && l.YPos === letter.YPos
        );

        if (matchingLetter) {
            return word.direction === "across";
        }
    }
}

/**
 * 
 * @param {*} word 
 * @param {*} letter 
 * @param {*} isVertical 
 */
function createWordObject(word, letter, isVertical) {
    let object = {
        word: word,
        direction: isVertical ? "down" : "across",
        letters: []
    };

    word = word.toLowerCase();
    const targetLetter = letter.letter.toLowerCase();

    // Find every occurrence of the intersecting letter
    const matchingIndexes = [];

    for (let i = 0; i < word.length; i++) {
        if (word[i] === targetLetter) {
            matchingIndexes.push(i);
        }
    }

    // Make sure the letter actually exists in the word
    if (matchingIndexes.length === 0) {
        return null;
    }

    // Pick a random occurrence
    const randomIndex =
        matchingIndexes[Math.floor(Math.random() * matchingIndexes.length)];

    // Add the letters before the intersection
    for (let i = 0; i < randomIndex; i++) {
        object.letters.push({
            letter: word[i],
            XPos: isVertical ? letter.XPos : letter.XPos - randomIndex + i,
            YPos: isVertical ? letter.YPos - randomIndex + i : letter.YPos
        });
    }

    // Add the intersecting letter
    object.letters.push(letter);

    // Add the letters after the intersection
    for (let i = randomIndex + 1; i < word.length; i++) {
        object.letters.push({
            letter: word[i],
            XPos: isVertical ? letter.XPos : letter.XPos + (i - randomIndex),
            YPos: isVertical ? letter.YPos + (i - randomIndex) : letter.YPos
        });
    }

    console.log(object);

    return object;
}

/**
 * @param {string} word - The word object
 * @param {object} letter - The random letter and location to place the word
 * @returns {boolean}
 */
function isValidWord(word, allLetters) {
    // Check the position of every letter to see if it matches another location, but NOT the same letter
    let isValid = true;

    // Check to see if this location overlaps any current letters
    allLetters.forEach(refLetterObject => {
        word.letters.forEach(newWordLetterObject => {
            // If same position, different letter
            if(refLetterObject.XPos === newWordLetterObject.XPos
                && refLetterObject.YPos === newWordLetterObject.YPos
                && refLetterObject.letter !== newWordLetterObject.letter
            ) {
                isValid = false;
            }
        })
    });

    
}