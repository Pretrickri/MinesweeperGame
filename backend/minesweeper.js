import { Tile } from "./Tiles.js";

/**
 * A board is a 2D array of Tiles.
 * @typedef {Tile[][]} Board 
 */

/**
 * Build a square board of given size
 * @param {number} size - number of Tiles in each row and column 
 * @returns {Board} - size x size board
 */
export function BuildBoard(size){
    const board = [];
    for(let i=0; i<size; i++){
        const row = [];
        for(let j=0; j<size; j++){
            const tile = new Tile(i,j);
            row.push(tile);
        }
        board.push(row);
    }
    return board;
}

/**
 * Print an given board to the console. Shows coordinates and weather a Tile is a Mine or not.
 * @param {Board} board - the board to print
 * @example
 * || (0,0) = false || (0,1) = true || (0,2) = false || 
 * || (1,0) = false || (1,1) = false || (1,2) = false || 
 * || (2,0) = true || (2,1) = false || (2,2) = false ||
 */
export function PrintBoard(board){
    for(let i=0; i<board.length; i++){
        let print_board = "|| ";
        for(let j=0; j<board.length; j++){
            print_board += "(" +
                board[i][j].x + "," +
                board[i][j].y + ") = " +
                board[i][j].isMine() + " || ";
        }
        console.log(print_board);
    }
}

/* UPGRADE
   Mines should be added as we create the board, so we don't have to use a lot of computation to check
   for adjacent mines after adding them randomly.
   Additionally, we should find a way to avoid adding multiple mines to the same Tile in a more efficient way.
*/ 
/**
 * Radomly adds mines to the given board.
 * @param {Board} board - the board to add mines to. 
 * @param {number} numberOfMines - number of mines to add to the board
 */
export function addMines(board, numberOfMines){
    for(let i=0; i<numberOfMines;i++){
        const randX = Math.floor(Math.random() * board.length);
        const randY = Math.floor(Math.random() * board.length);

        if(!(board[randX][randY].isMine())){
            board[randX][randY].setMine();
        }
    }
}