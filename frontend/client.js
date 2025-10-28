import * as minesweeper from "../backend/minesweeper.js";
import { Tile } from "../backend/Tiles.js";

const BOARD_SIZE = 3;
const NUM_MINES = 7;
const board = minesweeper.BuildBoard(BOARD_SIZE);
const boardElement = document.querySelector('.board');
const textElement = document.querySelector('.subtext');
let gameStart = false;

//minesweeper.PrintBoard(board);

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.state);
        tile.state.addEventListener('click', () => {
            if(tile.getState() !== minesweeper.TILE_STATES.HIDDEN){
                return;
            }
            if(!gameStart){
                gameStart = true;
                minesweeper.addMines(tile, board, NUM_MINES);
                minesweeper.setAdjacentMines(board);
                changeMineCountText();
            }
            minesweeper.revealTile(tile, board, BOARD_SIZE);
            checkEndGame(tile, board, boardElement);

        });
        tile.state.addEventListener('contextmenu', e => {
            if(!gameStart){
                return;
            }
            e.preventDefault();
            minesweeper.flagTile(tile);
            changeMineCountText();
            });
    });
});

boardElement.style.setProperty('--size', BOARD_SIZE);

/**
 * Checks if the game is over after a tile is revealed.
 * @param {Tile} tile - the tile that was just revealed 
 * @param {Board} board - the game board
 */
export function checkEndGame(tile, board){
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

/**
 * Stops the game board from being clickable by stopping event propagation.
 * @param {Event} e - the event to stop propagation for 
 */
function stopProp(e){
    e.stopImmediatePropagation();
}

/**
 * Updates the mine count text displayed to the user.
 */
function changeMineCountText(){
    textElement.textContent = `Mines left: ${minesweeper.getMinesLeft_flag()}`;
}