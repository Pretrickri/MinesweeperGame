import { Tile } from "./Tiles.js";

export const TILE_STATES = {
    HIDDEN: "hidden",
    REVEALED: "revealed",
    FLAGGED: "flagged",
    MINE: "mine"
};

let tilesLeft = 0;
let minesLeft_flag = 0;

/**
 * Returns how many non-mine tiles are left to be revealed.
 * @returns {number} - tilesLeft in the board
 */
export function getTilesLeft(){
    return tilesLeft;
}

/**
 * Returns how many mines are left unflagged.
 * @returns {number} - number of mines left
 */
export function getMinesLeft_flag(){
    return minesLeft_flag;
}

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
    tilesLeft = size * size;
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
 * @param {Tile} tile - the first tile clicked by the user (should not be a mine)
 * @param {Board} board - the board to add mines to. 
 * @param {number} numberOfMines - number of mines to add to the board
 */
export function addMines(tile, board, numberOfMines){
    tilesLeft -= numberOfMines;
    minesLeft_flag = numberOfMines;
    const coordPool = new Map();
    coordPool.set(tile.x, tile.y); // First clicked tile should not be a mine
    
    for(let i=0; i<numberOfMines;i++){
        const randX = Math.floor(Math.random() * board.length);
        const randY = Math.floor(Math.random() * board.length);

/*  UPDATE - try Fisher-Yates algorithm shuffle (gemini)
        if(coordPool.has(randX)){
            i--;
            continue;
        }
        else if(coordPool.get(randX) === randY){
            i--;
            continue;
        }
        else{
            coordPool.set(randX, randY);
            board[randX][randY].setMine();
        }
*/

        if((randX !== tile.x) && (randY !== tile.y) && !(board[randX][randY].isMine())){
            board[randX][randY].setMine();
        }
        else{
            i--;
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
        minesLeft_flag--;
    }
    else if(tile.getState() === TILE_STATES.FLAGGED){
        tile.setState(TILE_STATES.HIDDEN);
        minesLeft_flag++;
    }
}

/**
 * Runs the end game lose sequence, revealing all mines in the board.
 * @param {Board} board - game board
 */
export function endGame(board){
    board.forEach(row => {
        row.forEach(tile => {
            if(tile.isMine()){
                tile.setState(TILE_STATES.MINE);
            }
        });
    });
}

/**
 * Reveals a given Tile and returns whether it was a mine or not. If the tile has
 * no adjacent mines, it reveals all adjacent tiles recursively.
 * @param {Tile} tile - the tile to be revealed
 * @param {Board} board - the game board
 * @param {number} board_size - size of one side of the square board
 */
export function revealTile(tile, board, board_size){
    if(tile.isMine()){
        tile.setState(TILE_STATES.MINE);
        return;
    }
    else if(tile.adjMines === 0){
        tilesLeft--;
        tile.state.textContent = "";
        tile.setState(TILE_STATES.REVEALED);
        for(let i=-1; i<=1; i++){
        for(let j=-1; j<=1; j++){
            const newX = tile.x + i;
            const newY = tile.y + j;
            if(newX >= 0 && newX < board_size &&
                newY >= 0 && newY < board_size){
                const adjacentTile = board[newX][newY];
                if(adjacentTile.getState() !== TILE_STATES.REVEALED){
                    revealTile(adjacentTile, board, board_size);
                }
            }
        }
    }
    }
    else{
        tilesLeft--;
        tile.state.textContent = tile.adjMines;
        tile.setState(TILE_STATES.REVEALED);
    }
}