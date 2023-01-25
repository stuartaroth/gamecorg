import React from 'react';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import _ from 'underscore';

import DataService from './DataService';

function GuessResultsComponent(props) {
    let results = props.results;
    let resultItems = results.map((i) => <div key={i.key}>{i.key} {i.value ? "✅" : "❌"}</div>);
    let correctCount = results.filter((i) => i.value).length;
    return (
        <div>
            <div key="correctCount">{correctCount} Correct!</div>
            <div key="resultContainer">{resultItems}</div>
        </div>
    );
}

export default function CategoryView() {
    let { category } = useParams();
    let categoryData = DataService.findFromParam(category);

    let guesses = categoryData.values;
    let currentGuess = _.sample(guesses);
    guesses = _.reject(guesses, (i) => i === currentGuess);

    let [myState, setMyState] = useState({
        guesses: guesses,
        currentGuess: currentGuess,
        guessResults: [],
        gameOver: false
    });

    let [seconds, setSeconds] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {

            setSeconds(function(seconds) {
                if (seconds < 1) {
                    setMyState(function (previousState) {
                        let newState = {
                            guesses: previousState.guesses,
                            currentGuess: previousState.currentGuess,
                            guessResults: previousState.guessResults,
                            gameOver: true
                        };

                        if (newState.gameOver) {
                            var entriesToRemove = previousState.guessResults.map((i) => i.key);
                            var entriesToUpdate = _.reject(categoryData.values, (i) => _.contains(entriesToRemove, i));
                            DataService.setSpecificData(categoryData.name, entriesToUpdate);
                        }

                        return newState;
                    });

                    return seconds;
                } else {
                    return seconds - 1;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    });

    function correct() {
        correctOrIncorrect(true);
    }

    function incorrect() {
        correctOrIncorrect(false);
    }

    function correctOrIncorrect(correctBoolean) {
        setMyState(function (previousState) {
            let newGuess = _.sample(previousState.guesses);
            let newGuesses = _.reject(previousState.guesses, (i) => i === newGuess);
            let newGuessResults = previousState.guessResults;
            newGuessResults.push({key: previousState.currentGuess, value: correctBoolean});

            let newState = {
                guesses: newGuesses,
                currentGuess: newGuess,
                guessResults: newGuessResults,
                gameOver: newGuesses.length === 0 && newGuess == null
            };

            if (newState.gameOver) {
                DataService.resetSpecificData(categoryData.name);
            }

            return newState;
        });
    }

    return (
        <div>
            {
                !myState.gameOver &&
                <div>
                    <div>{seconds}</div>
                    <br></br>
                    <br></br>
                    <div>{myState.currentGuess}</div>
                    <br></br>
                    <br></br>
                    <div>
                        <span onClick={incorrect} style={{fontSize: '60px'}}>❌</span><span >⠀⠀⠀⠀</span><span onClick={correct} style={{fontSize: '60px'}}>✅</span>
                    </div>
                </div>
            }
            {
                myState.gameOver &&
                <div>
                    <GuessResultsComponent results={myState.guessResults}></GuessResultsComponent>
                </div>
            }
        </div>

    );
}