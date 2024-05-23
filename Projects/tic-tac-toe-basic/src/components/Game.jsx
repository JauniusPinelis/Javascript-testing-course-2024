import React, { useState } from 'react';
import Board from './Board';
import calculateWinner from '../utils/calculateWinner';
import './Game.css';

const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const handleClick = (index) => {
        if (calculateWinner(squares) || squares[index]) {
            return;
        }
        const newSquares = squares.slice();
        newSquares[index] = isXNext ? 'X' : 'O';
        setSquares(newSquares);
        setIsXNext(!isXNext);
    };

    const winner = calculateWinner(squares);
    const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
    };

    return (
        <div className="game">
            <div className="status">{status}</div>
            <Board squares={squares} onClick={handleClick} />
            <button className="reset-button" onClick={resetGame}>Reset Game</button>
        </div>
    );
};

export default Game;
