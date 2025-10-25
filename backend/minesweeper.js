import { Tile } from "./Tiles.js";

export const TILE_STATES = {
    HIDDEN: "hidden",
    REVEALED: "revealed",
    FLAGGED: "flagged",
    MINE: "mine"
};

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
            const state = document.createElement('div');
            state.dataset.status = TILE_STATES.HIDDEN;
            const tile = new Tile(i,j, state);
            row.push(tile);
        }
        board.push(row);
    }
    return board;
}

/**
 * Sets the number of adjacent mines for each Tile in the board.
 * @param {Board} board - the game board 
 */
export function setAdjacentMines(board){
    board.forEach(row => {
        row.forEach(tile => {
            let mineCount = 0;
            for(let i=-1; i<=1; i++){
                for(let j=-1; j<=1; j++){
                    const newX = tile.x + i;
                    const newY = tile.y + j;
                    if(newX >= 0 && newX < board.length &&
                       newY >= 0 && newY < board.length){
                        if(board[newX][newY].isMine()){
                            mineCount++;
                        }
                    }
                }
            }
            tile.adjMines = mineCount;
        })
    });

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
                board[i][j].isMine() + "; adjMines = " +
                board[i][j].adjMines + " || ";
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

/**
 * Flags or unflags a given Tile.
 * @param {Tile} tile - the Tile to flag or unflag
 */
export function flagTile(tile){
    if(tile.getState() === TILE_STATES.HIDDEN){
        tile.setState(TILE_STATES.FLAGGED);
    }
    else if(tile.getState() === TILE_STATES.FLAGGED){
        tile.setState(TILE_STATES.HIDDEN);
    }
}

/**
 * Reveals a given Tile and returns whether it was a mine or not.
 * @param {Tile} tile - the tile to be revealed
 * @returns {boolean} - true if the tile was a mine, false otherwise
 */
export function revealTileIndividual(tile){
    if(tile.getState() === TILE_STATES.REVEALED){
        return false;
    }
    else if(tile.isMine()){
        tile.setState(TILE_STATES.REVEALED);
        return true;
    }
    else{
        tile.setState(TILE_STATES.REVEALED);
        return false;
    }
}

/**
 * Reveals tile if it has 0 adjacent mines.
 * @param {Tile} tile - the tile to be revealed 
 * @returns {boolean} - true if tile has 0 adjacent mines, false otherwise
 */
export function revealTileRecursive(tile){
    if(tile.adjMines !== 0){
        return false;
    }
    if(tile.getState() === TILE_STATES.REVEALED){
        return false;
    }

    tile.setState(TILE_STATES.REVEALED);
    return true;
}