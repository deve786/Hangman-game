import React, { useEffect, useState } from 'react';
import './Hangman.css';
import { Container, Row, Col } from 'react-bootstrap';
import WordList from './WordList';

function Hangman() {
    const [currentWord, setCurrentWord] = useState('');
    const [currentHint, setCurrentHint] = useState('');
    const [guessedLetters, setGuessedLetters] = useState(new Set());
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const maxGuesses = 6;

    const randomWord = () => {
        const { word, hint } = WordList[Math.floor(Math.random() * WordList.length)];
        
        setCurrentWord(word.toLowerCase());
        setCurrentHint(hint);
        setGuessedLetters(new Set());
        setWrongGuesses(0);
    };

    useEffect(() => {
        randomWord();
    }, []);

    const clickbtn = (letter) => {
        if (currentWord.includes(letter)) {
            setGuessedLetters(prevLetters => new Set(prevLetters.add(letter)));
        } else {
            setWrongGuesses(prev => prev + 1);
        }
    };

    const renderWordDisplay = () => {
        return currentWord.split("").map((letter, index) => (
            <li key={index} className={`letter ${guessedLetters.has(letter) ? 'guessed' : ''}`}>
                {guessedLetters.has(letter) ? letter.toUpperCase() : ''}
            </li>
        ));
    };

    return (
        <>
            {wrongGuesses >= maxGuesses && (
                <div className='game-modal'>
                    <div className="content">
                        <img src="./assets/images/lost.gif" alt="" />
                        <h4>Game Over</h4>
                        <p>The correct word was <b>{currentWord}</b></p>
                        <button className="play-again" onClick={randomWord}>Play Again</button>
                    </div>
                </div>
            )}
            <div className='hangman-main d-flex align-items-center justify-content-center min-vh-100'>
                <Container className='hangman-sub'>
                    <Row>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <div className='hangman-box'>
                                <img src={`./assets/images/hangman-${wrongGuesses}.svg`} alt="Hangman" />
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className='game-box'>
                                <ul className='word-display d-flex align-items-center justify-content-center mt-5'>
                                    {renderWordDisplay()}
                                </ul>
                                <h5 className='hint-text'>
                                    Hint: <span>{currentHint}</span>
                                </h5>
                                <h4>
                                    Incorrect guesses: <b className='text-danger'>{wrongGuesses}/{maxGuesses}</b>
                                </h4>
                                <div className='keyboard gap-2 flex-wrap d-flex'>
                                    {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
                                        <button key={letter} onClick={() => clickbtn(letter)} disabled={guessedLetters.has(letter) || wrongGuesses >= maxGuesses}>
                                            {letter.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Hangman;
