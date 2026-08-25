import '../componentCSS/generateButton.css'
import { useState } from 'react';

export default function GenerateButton ({callback}) {
    const [wordCount, setWordCount] = useState(10)

    // So we dont use string adding
    const wordCountAsNumber = Number(wordCount);

    const [difficultyValue, setDifficultyValue] = useState(1);
    return <button className="generate-button">
        <div className="upper-generate-button">
            <div onClick={ev => callback(wordCount, difficultyValue)} className="generate">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="72px" height="72px" viewBox="0 -64 640 640"><path d="M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"/></svg>
                <span>Generate</span>
            </div>
            <div className="generate-settings-button" onClick={ev => openSettings()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="72px" height="72px" viewBox="0 0 24 24" fill="none">
                    <path d="M12.7848 0.449982C13.8239 0.449982 14.7167 1.16546 14.9122 2.15495L14.9991 2.59495C15.3408 4.32442 17.1859 5.35722 18.9016 4.7794L19.3383 4.63233C20.3199 4.30175 21.4054 4.69358 21.9249 5.56605L22.7097 6.88386C23.2293 7.75636 23.0365 8.86366 22.2504 9.52253L21.9008 9.81555C20.5267 10.9672 20.5267 13.0328 21.9008 14.1844L22.2504 14.4774C23.0365 15.1363 23.2293 16.2436 22.7097 17.1161L21.925 18.4339C21.4054 19.3064 20.3199 19.6982 19.3382 19.3676L18.9017 19.2205C17.1859 18.6426 15.3408 19.6754 14.9991 21.405L14.9122 21.845C14.7167 22.8345 13.8239 23.55 12.7848 23.55H11.2152C10.1761 23.55 9.28331 22.8345 9.08781 21.8451L9.00082 21.4048C8.65909 19.6754 6.81395 18.6426 5.09822 19.2205L4.66179 19.3675C3.68016 19.6982 2.59465 19.3063 2.07505 18.4338L1.2903 17.1161C0.770719 16.2436 0.963446 15.1363 1.74956 14.4774L2.09922 14.1844C3.47324 13.0327 3.47324 10.9672 2.09922 9.8156L1.74956 9.52254C0.963446 8.86366 0.77072 7.75638 1.2903 6.8839L2.07508 5.56608C2.59466 4.69359 3.68014 4.30176 4.66176 4.63236L5.09831 4.77939C6.81401 5.35722 8.65909 4.32449 9.00082 2.59506L9.0878 2.15487C9.28331 1.16542 10.176 0.449982 11.2152 0.449982H12.7848ZM12 15.3C13.8225 15.3 15.3 13.8225 15.3 12C15.3 10.1774 13.8225 8.69998 12 8.69998C10.1774 8.69998 8.69997 10.1774 8.69997 12C8.69997 13.8225 10.1774 15.3 12 15.3Z" fill="#000000"/>
                </svg>
            </div>
        </div>
        <div className="generate-settings">
            <div>
                <p>Word Count</p>
                <div className="stepper">
                    <p onClick={() => setWordCount(wordCountAsNumber - 1)}>-</p>
                    <input type="text" id="word-count" name="word-count" max={100}
                        value={wordCount}
                        onChange={e => setWordCount(e.target.value)}/>
                    <p onClick={() => setWordCount(wordCountAsNumber + 1)}>+</p>
                </div>
            </div>
            <div>
                <p>Difficulty</p>
                <div className="difficulty-options">
                    <p className="selected" onClick={ev => setDifficulty(ev.target)}>1</p>
                    <p onClick={ev => setDifficulty(ev.target)}>2</p>
                    <p onClick={ev => setDifficulty(ev.target)}>3</p>
                </div>
            </div>
        </div>
    </button>

    function openSettings() {
        const element = document.querySelector('.generate-settings');
        element.classList.toggle('open-settings')
    }

    function setDifficulty (element) {
        let difficultyOptions = document.querySelectorAll('.difficulty-options p');

        difficultyOptions.forEach(element => {
            element.classList.remove('selected');
        });

        element.classList.add('selected');
        if([1, 2, 3].includes(Number(element.innerText))) {
            setDifficultyValue(Number(element.innerText))
        }

    }
}

