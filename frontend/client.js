import * as minesweeper from "../backend/minesweeper.js";

const BOARD_SIZE = 3;
const NUM_MINES = 1;

const board = minesweeper.BuildBoard(BOARD_SIZE);
const boardElement = document.querySelector('.board');

minesweeper.addMines(board, NUM_MINES);
minesweeper.setAdjacentMines(board);
minesweeper.PrintBoard(board);

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.state);
        tile.state.addEventListener('click', () => {
            minesweeper.revealTileIndividual(tile);
            if(tile.isMine()){
                alert("Game Over!");
            }
            if(tile.adjMines === 0){
                //minesweeper.revealTileRecursive(tile); TODO
            }
        });
        tile.state.addEventListener('contextmenu', e => {
            e.preventDefault();
            minesweeper.flagTile(tile);
            // UPDATE MINES LEFT DISPLAY
        });
    });
});

boardElement.style.setProperty('--size', BOARD_SIZE);
