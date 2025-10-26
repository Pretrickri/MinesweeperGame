import * as minesweeper from "../backend/minesweeper.js";
import { Tile } from "../backend/Tiles.js";

const BOARD_SIZE = 10;
const NUM_MINES = 10;
const board = minesweeper.BuildBoard(BOARD_SIZE);
const boardElement = document.querySelector('.board');

minesweeper.addMines(board, NUM_MINES); // These two should be inside BuildBoard imo.
minesweeper.setAdjacentMines(board);
//minesweeper.PrintBoard(board);

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.state);
        tile.state.addEventListener('click', () => {
            minesweeper.revealTile(tile, board, BOARD_SIZE);
            checkEndGame(tile, board);
        });
        tile.state.addEventListener('contextmenu', e => {
            e.preventDefault();
            minesweeper.flagTile(tile);
            // UPDATE MINES LEFT DISPLAY
        });
    });
});

boardElement.style.setProperty('--size', BOARD_SIZE);

/**
 * Stops the game board from being clickable by stopping event propagation.
 * @param {Event} e - the event to stop propagation for 
 */
function stopProp(e){
    e.stopImmediatePropagation();
}

/**
 * Checks if the game is over after a tile is revealed.
 * @param {Tile} tile - the tile that was just revealed 
 * @param {Board} board - the game board
 */
function checkEndGame(tile, board){
    if(tile.isMine()){ // LOSE CONDITION
        boardElement.addEventListener('click', stopProp, {capture: true});
        boardElement.addEventListener('contextmenu', stopProp, {capture: true});
        alert('You hit a mine! Game Over!');
        minesweeper.endGame(board);
    }
    else if(minesweeper.getTilesLeft() === 0){ // WIN CONDITION
        boardElement.addEventListener('click', stopProp, {capture: true});
        boardElement.addEventListener('contextmenu', stopProp, {capture: true});
        alert('You cleared the board! You win!');
        minesweeper.endGame(board);
    }
}