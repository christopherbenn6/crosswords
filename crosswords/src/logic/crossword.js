import words from "../assets/words.json"

/**
 * @param {int} difficulty - Interger from 1 to 3
 * @param {int} wordCount - 
 */
export async function createCrosswordData(difficulty, wordCount) {
    // Maximum dimensions of the crossword puzzle
    const gridSize = 30;

    let crosswordState = {
        words: [],
        xLength: "",
        yLength: ""
    };
    for(let i = wordCount; i > 0; i--) {
        crosswordState.words.push(getRandomWordObject(difficulty, crosswordState.words, gridSize));
    }

    crosswordState.xLength = crosswordState.words
        .flatMap(word => word.letters)
        .reduce((max, letter) => Math.max(max, letter.XPos), -Infinity)
        - crosswordState.words
        .flatMap(word => word.letters)
        .reduce((min, letter) => Math.min(min, letter.XPos), Infinity);

    crosswordState.yLength = crosswordState.words
        .flatMap(word => word.letters)
        .reduce((max, letter) => Math.max(max, letter.YPos), -Infinity)
        - crosswordState.words
        .flatMap(word => word.letters)
        .reduce((min, letter) => Math.min(min, letter.YPos), Infinity);

    return crosswordState;
}

/**
 * 
 * @param {int} difficulty - Interger from 1 to 3
 * @param {Object} crosswordState 
 */
function getRandomWordObject(difficulty, crosswordStateWords, gridSize) {
    const allLetters = getAllLetterPositions(crosswordStateWords);

    // No word has been added yet
    if(crosswordStateWords.length === 0) {
        let word = getRandomWordFromArray(words);
        let clue = getClue(words, word)
        return createFirstWordObject(word, gridSize, clue)
    }

    let newWord;
    let wordAdded = false;

    // Loop this until a valid word has been found
    while(!wordAdded) {
        const randLetter = allLetters[getRandomRange(0, allLetters.length - 1)]

        // Filter the words that contain the random letter
        const wordsThatContainRandLetter = words.filter(wordObject =>
        wordObject.word
            .toLowerCase()
            .includes(randLetter.letter.toLowerCase())
            && !crosswordStateWords.some(
                addedWord => addedWord.word === wordObject.word
            )
        );

        if(wordsThatContainRandLetter.length !== 0) {

            let randWord = getRandomWordFromArray(wordsThatContainRandLetter);
            let clue = getClue(wordsThatContainRandLetter, randWord);

            let isVertical = checkIsVertical(crosswordStateWords, randLetter, allLetters);

            let wordObject = createWordObject(randWord, randLetter, isVertical, clue)
            let isValid = isValidWord(wordObject, allLetters, crosswordStateWords);

            if(isValid) {
                newWord = wordObject;
                wordAdded = true;
            }
        }
    }

    return newWord;

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
    
    return allLetterPositions;
}

/**
 * 
 */
function getRandomWordFromArray (array) {
    return array[getRandomRange(0, array.length - 1)].word;
}

function getClue (array, word) {{
    return array.find(wordObject => wordObject.word === word).clue
}}

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

function createFirstWordObject(word, gridSize, clue) {
    let object = {
        word: word,
        direction: "across",
        clue: clue,
        letters: []
    };

    for(let i = 0; i < word.length; i++) {
        object.letters.push({
            letter: word[i],
            XPos: Math.floor((gridSize / 2) + (word.length / 2) - word.length) + i,
            YPos: Math.floor((gridSize / 2) + (word.length / 2) - word.length)
        })
    }

    return object;
}

/**
 * 
 * @param {*} word 
 * @param {*} letter 
 * @param {*} isVertical 
 */
function createWordObject(word, letter, isVertical, clue) {
    let object = {
        word: word,
        direction: isVertical ? "down" : "across",
        clue: clue,
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

    return object;
}

/**
 * @param {string} word - The word object
 * @param {object} letter - The random letter and location to place the word
 * @returns {boolean}
 */
function isValidWord(word, allLetters, crosswordStateWords) {
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

    // Here we check a "bubble" around the word to check for anything side by side that would break the word or create new ones
    if(word.direction == "across") {

        // Check before and after the word
        const leftXPos = word.letters[0].XPos - 1;
        const leftYPos = word.letters[0].YPos;
        const rightXPos = word.letters[word.letters.length - 1].XPos + 1;
        const rightYPos = word.letters[word.letters.length - 1].YPos;

        if(allLetters.find(
            letterPosition =>
                (letterPosition.XPos === rightXPos && letterPosition.YPos === rightYPos)
                || (letterPosition.XPos === leftXPos && letterPosition.YPos === leftYPos)
        )) {
            isValid = false;
        }

        for (let i = 0; i < word.letters.length; i++) {
            // Positions for above and below the current letter (word.letters[i])
            const XPos = word.letters[i].XPos;
            const upYPos = word.letters[i].YPos + 1;
            const downYPos = word.letters[i].YPos - 1;

            // Check for an existing letter there
            const existingUpLetter = allLetters.find(
            letterPosition =>
                letterPosition.XPos === XPos && letterPosition.YPos === upYPos
            );


            const existingDownLetter = allLetters.find(
            letterPosition =>
                letterPosition.XPos === XPos && letterPosition.YPos === downYPos
            );

            // Is that letter okay to be there (ie: is it part of an existing word). 
            // Check for both that letter and the current letter in the same word
            if(existingDownLetter) {
                if(!areLettersInSameWord(word.letters[i], existingDownLetter, crosswordStateWords)) {
                    isValid = false;
                }
            } else if(existingUpLetter) {
                if(!areLettersInSameWord(word.letters[i], existingUpLetter, crosswordStateWords)) {
                    isValid = false;
                }
            }
        }

    } else if(word.direction == "down") {
        // Check before and after the word
        const upXPos = word.letters[0].XPos - 1;
        const upYPos = word.letters[0].YPos;
        const downXPos = word.letters[word.letters.length - 1].XPos + 1;
        const downYPos = word.letters[word.letters.length - 1].YPos;

        if(allLetters.find(
            letterPosition =>
                (letterPosition.XPos === upXPos && letterPosition.YPos === upYPos)
                || (letterPosition.XPos === downXPos && letterPosition.YPos === downYPos)
        )) {
            isValid = false;
        }

        for (let i = 0; i < word.letters.length; i++) {
            // Positions for above and below the current letter (word.letters[i])
            const YPos = word.letters[i].YPos;
            const leftXPos = word.letters[i].XPos - 1;
            const rightXPos = word.letters[i].XPos + 1;

            // Check for an existing letter there
            const existingLeftLetter = allLetters.find(
            letterPosition =>
                letterPosition.YPos === YPos && letterPosition.XPos === leftXPos
            );


            const existingRightLetter = allLetters.find(
            letterPosition =>
                letterPosition.YPos === YPos && letterPosition.XPos === rightXPos
            );

            // Is that letter okay to be there (ie: is it part of an existing word). 
            // Check for both that letter and the current letter in the same word
            if(existingLeftLetter) {
                if(!areLettersInSameWord(word.letters[i], existingLeftLetter, crosswordStateWords)) {
                    isValid = false;
                }
            } else if(existingRightLetter) {
                if(!areLettersInSameWord(word.letters[i], existingRightLetter, crosswordStateWords)) {
                    isValid = false;
                }
            }
        }
    }

    return isValid;

}

function areLettersInSameWord(x, y, crosswordStateWords) {
    if(x === null || y === null) return false;

    return crosswordStateWords.some(word => {
        return word.letters.includes(x) &&
            word.letters.includes(y);
});
}