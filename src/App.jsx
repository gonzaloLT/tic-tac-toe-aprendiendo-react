import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constants";
import { checkWinner, checkEndGame } from "./logic/board";
import { BoardModal } from "./components/BoardModal";
import { WinnerModal } from "./components/WinnerModal";
import { saveGameToStorage, resetGameToStorage } from "./logic/storage";

/**
 * * Traducciones
 * * Board = tablero
 * * Turns = turnos
 * * Square -> Seria como el cuadradito de el tablero
 *
 */

function App() {
    Array(9).fill(null);
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem("board");
        return boardFromStorage
            ? JSON.parse(boardFromStorage)
            : Array(9).fill(null);
    });

    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem("turn");
        return turnFromStorage ?? TURNS.X;
    });
    // * null es que no hay ganador, false es que es empate y true hay ganador
    const [winner, setWinner] = useState(null);

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
        resetGameToStorage();
    };

    const updateBoard = (index) => {
        //No actualizamos esta posicion si tiene algo o ya hay un ganador
        if (board[index] || winner) return;

        //Actualizar el tablero
        const newBoard = [...board];
        newBoard[index] = turn;
        setBoard(newBoard);

        //Cambiar el turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn(newTurn);

        //Guardar partida en el LocalStorage
        saveGameToStorage({
            board: newBoard,
            turn: newTurn,
        });
        //Revisar si hay ganador
        const newWinner = checkWinner(newBoard);

        if (newWinner) {
            confetti();
            setWinner(newWinner);
        } else if (checkEndGame(newBoard)) {
            setWinner(false); //Empate
        }
    };

    return (
        <main className="board">
            <h1>Tic Tac Toe</h1>

            <button onClick={resetGame}>Resetear juego</button>

            <BoardModal updateBoard={updateBoard} board={board} />

            <section className="turn">
                <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
            </section>

            <WinnerModal winner={winner} resetGame={resetGame} />
        </main>
    );
}

export default App;
