import { WINNER_COMBOS } from "../constants";

export const checkWinner = (checkToBoard) => {
    for (const combo of WINNER_COMBOS) {
        const [a, b, c] = combo;
        if (
            checkToBoard[a] &&
            checkToBoard[a] === checkToBoard[b] &&
            checkToBoard[a] === checkToBoard[c]
        ) {
            return checkToBoard[a];
        }
    }
    return null;
};

export const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
};
