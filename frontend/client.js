import * as minesweeper from "../backend/minesweeper.js";

const BOARD_SIZE = 3;
const NUM_MINES = 3;
const board = minesweeper.BuildBoard(BOARD_SIZE);
const boardElement = document.querySelector('.board');

let tilesLeft = BOARD_SIZE * BOARD_SIZE - NUM_MINES;

minesweeper.addMines(board, NUM_MINES);
minesweeper.setAdjacentMines(board);
minesweeper.PrintBoard(board);

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.state);
        tile.state.addEventListener('click', () => {
            minesweeper.revealTileIndividual(tile, tilesLeft);
            if(tile.isMine()){ // LOSE CONDITION
                boardElement.addEventListener('click', stopProp, {capture: true});
                boardElement.addEventListener('contextmenu', stopProp, {capture: true});
                alert('You hit a mine! Game Over!');
                minesweeper.endGame(board);
            }
            if(tilesLeft === 0){ // WIN CONDITION
                boardElement.addEventListener('click', stopProp, {capture: true});
                boardElement.addEventListener('contextmenu', stopProp, {capture: true});
                alert('You cleared the board! You win!');
                minesweeper.endGame(board);
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

/**
 * Stops the game board from being clickable by stopping event propagation.
 * @param {Event} e - the event to stop propagation for 
 */
function stopProp(e){
    e.stopImmediatePropagation();
}